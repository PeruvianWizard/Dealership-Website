// app/page.tsx
import React from 'react';
import { supabase } from '../lib/supabaseClient';

type Dealership = {
  did: number;
  name: string;
  address?: string | null;
  phone?: number | null;
};

export default async function Home() {
  const { data: dealerships, error } = await supabase
    .from<Dealership>('dealership')
    .select('*')
    .order('did');

  if (error) {
    console.error('Supabase error:', error);
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Error loading dealerships</h1>
        <p className="text-sm text-red-600">An error occurred fetching data. Check server console for details.</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dealership Demo (Work in Progress)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(dealerships ?? []).map((d) => (
          <div key={d.did} className="p-4 shadow rounded bg-white">
            <h2 className="text-xl font-semibold">{d.name}</h2>
            <p className="text-gray-600">{d.address}</p>
            <p className="text-gray-600">Phone: {d.phone}</p>
            <a href={`/dealership/${d.did}`} className="mt-3 inline-block btn btn-outline btn-sm">View inventory</a>
          </div>
        ))}

        {(!dealerships || dealerships.length === 0) && (
          <div className="text-sm text-gray-600">No dealerships found.</div>
        )}
      </div>
    </main>
  );
}
