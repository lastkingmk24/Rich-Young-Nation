# Rich Young Nation

A personal wealth dashboard for the next generation — track net worth, log assets and debts, and measure progress toward your goals.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- Deploy on [Vercel](https://vercel.com)

## Pages

- `/` — Landing page with hero, features, and sign-in CTA
- `/dashboard` — Net-worth tracker + activity log (sign-in required)
- `/login` — Mock sign-in (stores your name in localStorage; demo only)

## Deploy on Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import `lastkingmk24/Rich-Young-Nation`.
3. Select branch `arena/a8563fcb-rich-young-nation`.
4. Framework preset **Next.js** is detected automatically.
5. Click **Deploy**.

Local dev:

```bash
npm install
npm run dev   # http://localhost:3000
npm run build # production build
```
