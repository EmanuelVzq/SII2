"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/auth";

type EstudianteData = {
  numero_control: string;
  persona: string;
  email: string;
  semestre: number;
  creditos_acumulados: string;
  promedio_ponderado: string;
  promedio_aritmetico: string;
  materias_cursadas: string;
  materias_reprobadas: string;
  materias_aprobadas: string;
  creditos_complementarios: number;
  porcentaje_avance: number;
  percentaje_avance_cursando: number;
  foto: string;
};

export default function EstudiantePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<EstudianteData | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function cargar() {
      setError(null);
      setData(null);

      const token = getToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch("/api/estudiante", {
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

        const j = await res.json();
        const payload = j?.data as EstudianteData | undefined;
        if (!payload) throw new Error("Respuesta sin 'data'");

        setData(payload);
      } catch (e: any) {
        setError(e?.message ?? "Error desconocido");
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, [router]);

  function onLogout() {
    clearToken();
    router.replace("/login");
  }

  function goToCalificaciones() {
    router.push("/calificaciones");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-3xl rounded-2xl border shadow-sm bg-white dark:bg-zinc-900 p-6">
        <header className="flex items-center justify-between gap-3 mb-4">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Información del estudiante
          </h1>
          <button
            onClick={onLogout}
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
          >
            Cerrar sesión
          </button>
        </header>

        {loading && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Cargando información del estudiante...
          </p>
        )}

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {error}{" "}
            <button onClick={() => router.replace("/login")} className="underline ml-2">
              Ir al login
            </button>
          </div>
        )}

        {data && (
          <>
            <div className="grid gap-4 md:grid-cols-2 mt-4">
              <div className="space-y-2">
                <Item k="Número de control" v={data.numero_control} />
                <Item k="Nombre" v={data.persona} />
                <Item k="Email" v={data.email} />
                <Item k="Semestre" v={String(data.semestre)} />
                <Item k="Créditos acumulados" v={data.creditos_acumulados} />
                <Item k="Promedio ponderado" v={data.promedio_ponderado} />
                <Item k="Promedio aritmético" v={data.promedio_aritmetico} />
                <Item k="Materias cursadas" v={data.materias_cursadas} />
                <Item k="Materias reprobadas" v={data.materias_reprobadas} />
                <Item k="Materias aprobadas" v={data.materias_aprobadas} />
                <Item
                  k="Créditos complementarios"
                  v={String(data.creditos_complementarios)}
                />
                <Item
                  k="Porcentaje de avance"
                  v={`${data.porcentaje_avance}%`}
                />
                <Item
                  k="Avance cursando"
                  v={`${data.percentaje_avance_cursando}%`}
                />
              </div>

              <div className="flex flex-col items-center gap-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Foto</p>
                {data.foto ? (
                  <img
                    className="rounded-xl border max-w-xs"
                    alt="Foto estudiante"
                    src={`data:image/jpeg;base64,${data.foto}`}
                  />
                ) : (
                  <div className="rounded-xl border p-6 text-sm text-zinc-500">
                    Sin foto
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={goToCalificaciones}
                className="rounded-xl border px-5 py-2 text-sm font-medium bg-zinc-50 dark:bg-zinc-800 hover:bg-black/5 dark:hover:bg-white/10 transition"
              >
                Ver calificaciones
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border bg-zinc-50 dark:bg-zinc-800/40 px-3 py-2">
      <span className="text-sm text-zinc-600 dark:text-zinc-300">{k}</span>
      <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{v}</span>
    </div>
  );
}
