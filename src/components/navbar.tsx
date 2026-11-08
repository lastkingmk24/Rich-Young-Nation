"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(localStorage.getItem("ry_user"));
  }, []);

  const isAuthed = !!user;

  const handleLogout = () => {
    localStorage.removeItem("ry_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-b-white/10 bg-black/60 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded bg-gradient-to-br from-yellow-400 to-emerald-500 flex items-center justify-center text-black font-bold text-sm shadow-lg">
            RY
          </span>
          <span className="font-bold text-xl tracking-tight text-white">
            Rich Young Nation
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Login", href: "/login" },
          ].map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
                  active
                    ? "bg-yellow-500 text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          {!isAuthed ? (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors border border-white/10"
            >
              Sign in
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-sm text-white/70">
              <span>{user}</span>
              <button
                onClick={handleLogout}
                className="text-yellow-400 hover:text-yellow-300 font-medium underline underline-offset-2"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
