"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    localStorage.setItem("ry_user", name.trim());
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 rounded bg-gradient-to-br from-yellow-400 to-emerald-500 flex items-center justify-center text-black font-bold text-sm shadow-lg">
              RY
            </span>
            <span className="font-bold text-xl tracking-tight text-white">
              Rich Young Nation
            </span>
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10 shadow-2xl shadow-black/40">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-gray-400 text-sm mb-6">
            Enter your name to open your dashboard.
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
                Your name
              </label>
              <input
                type="text"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-600"
                placeholder="e.g. Alex"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-400 text-black font-bold py-3 hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-500/25"
            >
              Enter dashboard
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            No real data is stored — this is a demo of the app.
          </p>
        </div>
      </div>
    </div>
  );
}
