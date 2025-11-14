"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearToken } from "@/lib/auth";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/estudiante", label: "Inicio" },
    { href: "/horario", label: "Horario" },
    { href: "/calificaciones", label: "Calificaciones" },
    { href: "/kardex", label: "Kardex" },
  ];

  const onLogout = () => {
    clearToken();
    router.replace("/login");
    router.refresh();
  };

  return (
    <nav className="bg-white text-zinc-900 p-4 shadow-md flex items-center justify-between">
      <h1 className="text-lg font-semibold">SII2</h1>

      <ul className="flex items-center gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`hover:text-zinc-600 ${pathname === link.href ? "underline font-bold" : ""}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={onLogout}
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-zinc-50"
          >
            Salir
          </button>
        </li>
      </ul>
    </nav>
  );
}


/*"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/horario", label: "Horario" },
    { href: "/calificaciones", label: "Calificaciones" },
    { href: "/kardex", label: "KARDEX" },
    { href: "", label: "Logout"}
  ];

  return (
    <nav className="bg-white-100 text-white p-4 shadow-md flex items-center justify-between">
      <h1 className="text-lg font-semibold">CETECH</h1>

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
}*/
