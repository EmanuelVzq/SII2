"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Bell, UserRound, LogOut } from "lucide-react";
import { clearToken } from "@/lib/auth";
import router from "next/router";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/estudiante", label: "Inicio" },
    { href: "/horario", label: "Horario" },
    { href: "/calificaciones", label: "Calificaciones" },
    { href: "/kardex", label: "Kardex" },
  ];

  const isActive = (href: string) => pathname === href;

  const onLogout = () => {
      clearToken();
      router.replace("/login");
    };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-zinc-700" />
            <span className="font-semibold text-zinc-800">SII 2</span>
          </div>

          {/* Center menu */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={
                    "text-sm transition hover:text-zinc-900 " +
                    (isActive(l.href)
                      ? "text-zinc-900 font-semibold underline underline-offset-4"
                      : "text-zinc-600")
                  }
                  aria-current={isActive(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
          </div>
        </div>
      </div>
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
