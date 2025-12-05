// app/dealership/[did]/page.tsx
import React from 'react';
import { supabase } from '@lib/supabaseClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function DealershipTransactions({ params }: { params: Promise<{ did: string }> | { did: string } }) {
  // params may be a Promise in Next 16 — await it
  const resolved = await params;
  const did = Number(resolved.did);
  var dealershipURL = "/dealership/" + did;

  // fetch dealership and vehicles
  const { data: dealership } = await supabase.from('dealership').select('*').eq('did', did).single();
  if (!dealership) return notFound();

  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('did', did)
    .order('tid');

  if (error) {
    console.error('Error fetching transactions:', error);
    return <div className="p-8 text-red-600">Error loading inventory.</div>;
  }

  return (
    <main className="p-8 bg-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">{dealership.name}</h1>
          <p className="text-sm text-gray-600">{dealership.address}</p>
        </div>
        <div>
          <Link href={dealershipURL} className="btn btn-ghost btn-sm">Back to Dealership page</Link>
        </div>
        <div>
          <Link href="/" className="btn btn-ghost btn-sm">← Back to Landing</Link>
        </div>
      </div>

      {transactions && transactions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transactions.map((t) => (
            <div key={t.tid} className="p-4 shadow rounded bg-white">
              <h2 className="font-semibold">{t.tid}</h2>
              <p className="text-sm">VIN: {t.vin}</p>
              <p className="text-sm">Customer ID: {t.customerid}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No transactions for this dealership.</p>
      )}
    </main>
  );
}
