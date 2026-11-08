"use client";

import Link from "next/link";
import { useState } from "react";

type Entry = {
  id: string;
  type: "deposit" | "goal";
  label: string;
  amount: number;
  date: string;
};

const initialEntries: Entry[] = [
  { id: "1", type: "deposit", label: "Freelance payout", amount: 1200, date: "Nov 3" },
  { id: "2", type: "goal", label: "Emergency fund milestone", amount: 5000, date: "Oct 28" },
  { id: "3", type: "deposit", label: "Side project revenue", amount: 850, date: "Oct 20" },
];

export default function Dashboard() {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [asset, setAsset] = useState("");
  const [liability, setLiability] = useState("");

  const netWorth =
    entries.reduce((sum, e) => sum + (e.type === "deposit" ? e.amount : -e.amount), 0) +
    (parseFloat(asset) || 0) -
    (parseFloat(liability) || 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const a = parseFloat(asset);
    const l = parseFloat(liability);
    if (!a && !l) return;
    const now = new Date();
    const month = now.toLocaleDateString(undefined, { month: "short" });
    const day = now.getDate();
    const newEntries: Entry[] = [];
    if (a) {
      newEntries.push({
        id: Date.now().toString(),
        type: "deposit",
        label: "Asset added",
        amount: a,
        date: `${month} ${day}`,
      });
    }
    if (l) {
      newEntries.push({
        id: (Date.now() + 1).toString(),
        type: "goal",
        label: "Debt recorded",
        amount: l,
        date: `${month} ${day}`,
      });
    }
    setEntries([...newEntries, ...entries]);
    setAsset("");
    setLiability("");
  };

  return (
    <div className="px-6 py-8 md:py-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Welcome back. Here&apos;s where your wealth stands today.
          </p>
        </div>
        <Link
          href="/login"
          className="px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors"
        >
          Switch account
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Net worth</p>
          <p className="text-3xl font-bold text-white mt-1">${netWorth.toLocaleString()}</p>
          <p className="text-xs text-yellow-400 mt-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></span>
            Up from last month
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Assets logged</p>
          <p className="text-3xl font-bold text-white mt-1">
            {entries.filter((e) => e.type === "deposit").length}
          </p>
          <p className="text-xs text-white/60 mt-1">Tap to add more</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">Goals reached</p>
          <p className="text-3xl font-bold text-white mt-1">
            {entries.filter((e) => e.type === "goal").length}
          </p>
          <p className="text-xs text-white/60 mt-1">Keep stacking</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Log a move</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Asset amount ($)</label>
                <input
                  type="number"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g. 1200"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Debt amount ($)</label>
                <input
                  type="number"
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="e.g. 400"
                  value={liability}
                  onChange={(e) => setLiability(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-yellow-400 text-black font-bold py-2.5 hover:bg-yellow-300 transition-colors"
            >
              Record
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent activity</h2>
          <div className="overflow-hidden rounded-lg border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-white/10 bg-white/5">
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-left px-4 py-3 font-medium">Description</th>
                  <th className="text-right px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {entries.map((e) => (
                  <tr key={e.id} className="text-white/80 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono">{e.date}</td>
                    <td className="px-4 py-3">{e.label}</td>
                    <td className="text-right px-4 py-3">
                      <span className={`font-mono ${
                        e.type === "deposit" ? "text-emerald-400" : "text-rose-400"
                      }`}>
                        {e.type === "deposit" ? "+" : "-"}
                        ${e.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        e.type === "deposit"
                          ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                          : "border-rose-500/30 text-rose-400 bg-rose-500/10"
                      }`}>
                        {e.type === "deposit" ? "Deposit" : "Debt"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
