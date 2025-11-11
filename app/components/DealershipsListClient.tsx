// app/page.tsx  (Landing Page)
import React from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';

type Dealership = { did: number; name: string; address?: string | null; phone?: number | null };

export default async function LandingPage() {
  const { data: dealerships, error } = await supabase.from<Dealership>('dealership').select('*').order('did');

  if (error) {
    console.error('Supabase error:', error);
    return <div className="p-8">Error loading dealerships.</div>;
  }

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Dealership Demo</h1>
      <p className="mb-6 text-gray-600">Browse dealerships and view inventory. This is the Landing Page.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(dealerships ?? []).map((d) => (
          <article key={d.did} className="p-4 shadow rounded bg-white">
            <h2 className="text-xl font-semibold">{d.name}</h2>
            <p className="text-sm text-gray-600">{d.address}</p>
            <p className="text-sm text-gray-600">Phone: {d.phone}</p>

            {/* Link navigates to /dealership/[did] which we will create next */}
            <Link href={`/dealership/${d.did}`} className="mt-3 inline-block btn btn-outline btn-sm">
              View inventory
            </Link>
          </article>
        ))}

        {(!dealerships || dealerships.length === 0) && (
          <div className="text-sm text-gray-600">No dealerships found.</div>
        )}
      </div>
    </main>
  );
}
