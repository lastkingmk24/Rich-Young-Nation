"use strict";

import Link from "next/link";

const features = [
  {
    icon: "📈",
    title: "Track your net worth",
    body: "Log your assets and debts in one place and watch your number climb.",
  },
  {
    icon: "🎯",
    title: "Set wealth goals",
    body: "Break big targets into milestones and mark progress as you hit them.",
  },
  {
    icon: "👥",
    title: "Grow together",
    body: "A community of young builders focused on getting rich the right way.",
  },
];

const stats = ["$0", "0 members", "3 steps to start"];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <section className="relative px-6 py-20 md:px-12 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 to-black z-0" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-1.5 text-yellow-400 text-sm font-medium border border-yellow-500/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
            </span>
            Open to new members
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Build wealth.<br />
            <span className="text-yellow-400">Retire young.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Rich Young Nation is a personal wealth dashboard for the next
            generation. Track net worth, set goals, and measure progress — all
            in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-3.5 rounded-xl bg-yellow-400 text-black font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-500/25"
            >
              Start tracking
            </Link>
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 border-t border-white/10 bg-black/30">
        <h2 className="text-3xl font-bold text-white mb-12 text-center md:text-left">
          What you can do
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 text-center">
        <div className="flex flex-col sm:flex-row justify-center gap-8 text-xs md:text-sm text-gray-500 font-mono tracking-wider uppercase">
          <span>{stats[0]}</span>
          <span className="h-4 w-px bg-gray-700 mx-1 sm:mx-4 self-center"></span>
          <span>{stats[1]}</span>
          <span className="h-4 w-px bg-gray-700 mx-1 sm:mx-4 self-center"></span>
          <span>{stats[2]}</span>
        </div>
      </section>
    </div>
  );
}
