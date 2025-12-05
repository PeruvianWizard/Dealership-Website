// app/dealership/[did]/page.tsx
import React from 'react';
import { supabase } from '@lib/supabaseClient';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BuyVehicle from './BuyVehicle';

export default async function DealershipPage({ params }: { params: Promise<{ did: string }> | { did: string } }) {
  // params may be a Promise in Next 16 — await it
  const resolved = await params;
  const did = Number(resolved.did);
  var transactionURL = "/dealership/" + did + "/transactions";

  // fetch dealership and vehicles
  const { data: dealership } = await supabase.from('dealership').select('*').eq('did', did).single();
  if (!dealership) return notFound();

  const { data: vehicles, error } = await supabase
    .from('vehicle')
    .select('*')
    .eq('did', did)
    .order('vin');

  if (error) {
    console.error('Error fetching vehicles:', error);
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
          <Link href={transactionURL} className="btn btn-ghost btn-sm">View Transactions</Link>
        </div>
        <div>
          <Link href="/" className="btn btn-ghost btn-sm">← Back to Landing</Link>
        </div>
      </div>

      {vehicles && vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((v) => (
            <div key={v.vin} className='flex-row' aria-disabled={ v.bought ?? true}>
              <div className="p-4 flex-column shadow rounded bg-white" >
                <h2 className="font-semibold">{v.make} {v.model} ({v.year})</h2>
                <p className="text-sm">VIN: {v.vin}</p>
                <p className="text-sm">Mileage: {v.mileage}</p>
                <p className="text-sm">Price: ${v.price}</p>
              </div>
              <BuyVehicle did={did} vin={v.vin} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No vehicles for this dealership.</p>
      )}
    </main>
  );
}
