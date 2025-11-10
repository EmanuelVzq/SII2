"use client";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/auth";

export default function HorarioPage() {
  const [horario, setHorario] = useState<any[]>([]);
  const [periodo, setPeriodo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHorario = async () => {
      const token = getToken();
      if (!token) {
        setError("No hay token guardado. Inicia sesión primero.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/horarios", {
          headers: { "x-auth-token": token },
        });

        const data = await res.json();
        if (res.ok) {
          const materias = data.data?.[0]?.horario || [];
          const periodoInfo = data.data?.[0]?.periodo || null;
          setHorario(materias);
          setPeriodo(periodoInfo);
        } else {
          setError(data.error || "Error al obtener el horario.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHorario();
  }, []);

  if (loading)
    return <p className="text-gray-400 text-center p-4">Cargando horario...</p>;

  if (error)
    return (
      <div className="bg-red-900/40 border-l-4 border-red-600 text-red-300 p-4 m-4 rounded-lg">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-zinc-950 text-zinc-100 rounded-2xl shadow-xl border border-zinc-800 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-2 text-zinc-100">
        Horario del estudiante
      </h2>

      {periodo && (
        <p className="text-sm text-zinc-400 mb-4">
          <span className="font-semibold text-zinc-200">
            {periodo.descripcion_periodo}
          </span>{" "}
          — {periodo.clave_periodo} ({periodo.anio})
        </p>
      )}

      <table className="min-w-full border border-zinc-800 text-sm text-center rounded-lg overflow-hidden">
        <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-700">
          <tr>
            <th className="p-3 border border-zinc-800">Materia</th>
            <th className="p-3 border border-zinc-800">Clave</th>
            <th className="p-3 border border-zinc-800">Lunes</th>
            <th className="p-3 border border-zinc-800">Martes</th>
            <th className="p-3 border border-zinc-800">Miércoles</th>
            <th className="p-3 border border-zinc-800">Jueves</th>
            <th className="p-3 border border-zinc-800">Viernes</th>
            <th className="p-3 border border-zinc-800">Sábado</th>
          </tr>
        </thead>
        <tbody>
          {horario.map((materia) => (
            <tr
              key={materia.id_grupo}
              className="hover:bg-zinc-900/70 transition-colors"
            >
              <td className="p-3 border border-zinc-800 text-left font-medium text-zinc-100">
                {materia.nombre_materia}
              </td>
              <td className="p-3 border border-zinc-800 text-zinc-400">
                {materia.clave_materia}
              </td>
              <td className="p-3 border border-zinc-800">
                {materia.lunes ? (
                  <span className="text-zinc-200">
                    {materia.lunes}{" "}
                    <span className="text-zinc-500">
                      ({materia.lunes_clave_salon})
                    </span>
                  </span>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </td>
              <td className="p-3 border border-zinc-800">
                {materia.martes ? (
                  <span className="text-zinc-200">
                    {materia.martes}{" "}
                    <span className="text-zinc-500">
                      ({materia.martes_clave_salon})
                    </span>
                  </span>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </td>
              <td className="p-3 border border-zinc-800">
                {materia.miercoles ? (
                  <span className="text-zinc-200">
                    {materia.miercoles}{" "}
                    <span className="text-zinc-500">
                      ({materia.miercoles_clave_salon})
                    </span>
                  </span>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </td>
              <td className="p-3 border border-zinc-800">
                {materia.jueves ? (
                  <span className="text-zinc-200">
                    {materia.jueves}{" "}
                    <span className="text-zinc-500">
                      ({materia.jueves_clave_salon})
                    </span>
                  </span>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </td>
              <td className="p-3 border border-zinc-800">
                {materia.viernes ? (
                  <span className="text-zinc-200">
                    {materia.viernes}{" "}
                    <span className="text-zinc-500">
                      ({materia.viernes_clave_salon})
                    </span>
                  </span>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </td>
              <td className="p-3 border border-zinc-800">
                {materia.sabado ? (
                  <span className="text-zinc-200">
                    {materia.sabado}{" "}
                    <span className="text-zinc-500">
                      ({materia.sabado_clave_salon})
                    </span>
                  </span>
                ) : (
                  <span className="text-zinc-600">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
