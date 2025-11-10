"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/horario", label: "Horario" },
    { href: "/calificaciones", label: "Calificaciones" },
    { href: "/kardex", label: "KARDEX" },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between">
      <h1 className="text-lg font-semibold">SII Estudiantes</h1>

      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:text-gray-200 ${
                pathname === link.href ? "underline font-bold" : ""
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
