"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/auth";

type MateriaKardex = {
  nombre_materia: string;
  clave_materia: string;
  periodo: string;
  creditos: string;
  calificacion: string;
  descripcion: string;
  semestre: number;
};

type KardexResponse = {
  code: number;
  message: string;
  flag: boolean;
  data: {
    porcentaje_avance: number;
    kardex: MateriaKardex[];
  };
};

export default function KardexPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kardex, setKardex] = useState<MateriaKardex[] | null>(null);
  const [avance, setAvance] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function cargar() {
      setError(null);
      setKardex(null);

      const token = getToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch("/api/kardex", {
          method: "GET",
          headers: {
            "x-auth-token": token,
            Accept: "application/json",
          },
          cache: "no-store",
        });

        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            clearToken();
            setError("Tu sesión expiró o es inválida. Vuelve a iniciar sesión.");
            return;
          }
          let msg = `HTTP ${res.status}`;
          try {
            const j = await res.json();
            msg = (j?.message as string) ?? (j?.error as string) ?? msg;
          } catch {}
          throw new Error(msg);
        }

        const j: KardexResponse = await res.json();
        setKardex(j?.data?.kardex ?? []);
        setAvance(j?.data?.porcentaje_avance ?? null);
      } catch (e: any) {
        setError(e?.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-5xl rounded-2xl border shadow-sm bg-white dark:bg-zinc-900 p-6">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Kardex del estudiante
          </h1>
          <nav className="flex items-center gap-3">
            <a href="/estudiante" className="underline text-sm">Estudiante</a>
            <a href="/calificaciones" className="underline text-sm">Calificaciones</a>
            <a href="/" className="underline text-sm">Inicio</a>
          </nav>
        </header>

        {loading && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Cargando kardex...</p>
        )}

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {error} <a href="/login" className="underline ml-2">Ir al login</a>
          </div>
        )}

        {avance !== null && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            <strong>Porcentaje de avance:</strong> {avance}%
          </p>
        )}

        {kardex && kardex.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border">
              <thead className="bg-zinc-100 dark:bg-zinc-800/60">
                <tr>
                  <th className="p-2 text-left">Semestre</th>
                  <th className="p-2 text-left">Clave</th>
                  <th className="p-2 text-left">Materia</th>
                  <th className="p-2 text-left">Créditos</th>
                  <th className="p-2 text-left">Calificación</th>
                  <th className="p-2 text-left">Periodo</th>
                  <th className="p-2 text-left">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {kardex.map((m, i) => (
                  <tr key={i} className="border-t hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2">{m.semestre}</td>
                    <td className="p-2">{m.clave_materia}</td>
                    <td className="p-2">{m.nombre_materia}</td>
                    <td className="p-2">{m.creditos}</td>
                    <td className="p-2">{m.calificacion ?? "—"}</td>
                    <td className="p-2">{m.periodo}</td>
                    <td className="p-2">{m.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && kardex?.length === 0 && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Sin datos en el kardex.</p>
        )}
      </div>
    </main>
  );
}
