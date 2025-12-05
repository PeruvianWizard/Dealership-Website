// app/dealership/[did]/page.tsx
import React from 'react';
import { supabase } from '@lib/supabaseClient';
import { notFound } from 'next/navigation';
import DealershipClient from "./DealershipClient";

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
            <DealershipClient
                did={did}
                dealership={dealership}
                vehicles={vehicles}
            />
        </main>
    );
}
