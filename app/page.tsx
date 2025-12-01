// app/page.tsx
import React from 'react';
import { supabase } from '@lib/supabaseClient';
import DealershipsListClient from "@/app/dealershipsPage/page";

export default async function Home() {
  const { data: dealerships, error } = await supabase
    .from('dealership')
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
    <DealershipsListClient />
  );
}
