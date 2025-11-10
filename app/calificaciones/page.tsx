"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/auth";

type Calificacion = {
  id_calificacion: number | string | null;
  numero_calificacion: number | string | null;
  calificacion: string | number | null;
};

type MateriaInfo = {
  id_grupo: number;
  nombre_materia: string;
  clave_materia: string;
  letra_grupo: string;
};

type MateriaItem = {
  materia: MateriaInfo;
  // el backend a veces manda "calificaiones" (typo). Lo toleramos.
  calificaiones?: Calificacion[];
  calificaciones?: Calificacion[];
};

type Periodo = {
  clave_periodo: string;
  anio: number;
  descripcion_periodo: string;
};

type PeriodoBlock = {
  periodo: Periodo;
  materias: MateriaItem[];
};

type ApiResponse = {
  code: number;
  message: string;
  flag: boolean;
  data: PeriodoBlock[];
};

export default function CalificacionesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [periodos, setPeriodos] = useState<PeriodoBlock[] | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function cargar() {
      setError(null);
      setPeriodos(null);

      const token = getToken();
      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        const res = await fetch("/api/calificaciones", {
          method: "GET",
          headers: {
            "x-auth-token": token, // el proxy lo traduce a Authorization: Bearer <token>
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

        const j: ApiResponse = await res.json();
        setPeriodos(Array.isArray(j?.data) ? j.data : []);
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
        <header className="flex items-center justify-between gap-3 mb-4">
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Calificaciones</h1>
          <nav className="flex items-center gap-3">
            <a className="underline text-sm" href="/estudiante">Estudiante</a>
            <a className="underline text-sm" href="/">Inicio</a>
          </nav>
        </header>

        {loading && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Cargando calificaciones…</p>
        )}

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-300">
            {error} <a className="underline ml-2" href="/login">Ir al login</a>
          </div>
        )}

        {!loading && !error && (!periodos || periodos.length === 0) && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Sin datos de calificaciones.</p>
        )}

        {periodos && periodos.map((blk, i) => (
          <PeriodoCard key={i} blk={blk} />
        ))}
      </div>
    </main>
  );
}

function PeriodoCard({ blk }: { blk: PeriodoBlock }) {
  const { periodo, materias } = blk;
  return (
    <section className="rounded-2xl border p-4 mb-6">
      <h2 className="text-lg font-semibold mb-3 text-black dark:text-zinc-50">
        {periodo.descripcion_periodo} • {periodo.anio} • {periodo.clave_periodo}
      </h2>

      <div className="space-y-4">
        {materias.map((m, idx) => (
          <MateriaTable key={idx} item={m} />
        ))}
      </div>
    </section>
  );
}

function MateriaTable({ item }: { item: MateriaItem }) {
  const rows = (item.calificaciones || item.calificaiones || []) as Calificacion[];
  const title = `${item.materia.nombre_materia} (${item.materia.clave_materia}) • Grupo ${item.materia.letra_grupo} — #${item.materia.id_grupo}`;

  return (
    <div className="rounded-xl border overflow-hidden">
      <div className="px-3 py-2 text-sm font-medium bg-zinc-50 dark:bg-zinc-800/40 text-black dark:text-zinc-100">
        {title}
      </div>
      <table className="w-full text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-800/60">
          <tr>
            <th className="text-left p-2"># Parcial</th>
            <th className="text-left p-2">Calificación</th>
            <th className="text-left p-2">ID</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={3} className="p-3 text-zinc-500">Sin calificaciones registradas</td>
            </tr>
          )}
          {rows.map((c, i) => (
            <tr key={`${c.id_calificacion ?? i}`} className="border-t">
              <td className="p-2">{toText(c.numero_calificacion)}</td>
              <td className="p-2">{toText(c.calificacion)}</td>
              <td className="p-2">{toText(c.id_calificacion)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function toText(v: unknown) {
  if (v === null || v === undefined || v === "") return "—";
  return String(v);
}
