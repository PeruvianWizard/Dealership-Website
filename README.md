CSE412 Dealership Demo

A simple Next.js + Tailwind + Supabase web app for a fictional vehicle dealership.
The app currently includes:

A Landing Page that lists dealerships from the Supabase database.

A Dealership Inventory Page that shows vehicles for each dealership when you click “View Inventory”.

🚀 Tech Stack

Next.js 16 (App Router)

Tailwind CSS

Supabase (Postgres)

Node.js v22+

⚙️ Setup Instructions
1. Clone the Repository
git clone https://github.com/<username>/<repo-name>.git
cd cse412-dealership

2. Install Dependencies
npm install

3. Create .env.local

Create a file named .env.local in the project root and add your Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key


You can find these values in your Supabase project under Project Settings → API.

4. Build Tailwind CSS (one-time)
npm run build:css


(or use npm run watch:css to rebuild automatically while developing)

5. Run the Development Server
npm run dev


Then open http://localhost:3000
 in your browser.

📁 Project Directory Overview
cse412-dealership/
├─ app/
│  ├─ dealership/
│  │  └─ [did]/page.tsx     → Dynamic route showing inventory for a specific dealership
│  ├─ components/            → Reusable UI components (e.g., dealership cards)
│  ├─ layout.tsx             → Root layout file (defines HTML structure & global styles)
│  ├─ page.tsx               → Landing page (lists all dealerships)
│  ├─ globals.css            → Global CSS imported by layout (compiled Tailwind output)
│  └─ favicon.ico            → App icon
│
├─ lib/
│  └─ supabaseClient.ts      → Initializes Supabase client (connects to database)
│
├─ src/
│  └─ styles/
│     └─ tailwind.css        → Tailwind input file (contains @tailwind directives)
│
├─ styles/
│  └─ globals.css            → Tailwind build output (used globally)
│
├─ .env.local                → Contains your Supabase URL and anon key (not tracked by Git)
├─ package.json              → Project scripts and dependencies
└─ README.md                 → Project instructions (this file)

🧭 Current Features

Landing page lists all dealerships

“View inventory” links open a page showing that dealership’s vehicles

Fully connected to Supabase — no authentication or RLS required

Works locally with just npm run dev

👥 Team Git Workflow
🔄 Cloning the Repo (first time)
git clone https://github.com/<username>/<repo-name>.git
cd cse412-dealership
npm install

📥 Pull Latest Changes

Before working on anything new, always pull:

git pull origin main

🌿 Create a Branch for Your Work
git checkout -b feature/your-branch-name


Example:

git checkout -b feature/add-navbar

✏️ Stage and Commit Changes
git add -A
git commit -m "feat: added navbar to layout"

☁️ Push Your Branch
git push origin feature/add-navbar


Then open a Pull Request (PR) on GitHub for review.

✅ Merge to Main (once approved)

Once your PR is reviewed or tested, merge it into the main branch on GitHub.
Then pull again to stay up to date:

git pull origin main

👥 Team

CSE412 Group — Stephaan Dahdal, Ethan MacTough, Alfieri Aprile, and Kevin Nomura