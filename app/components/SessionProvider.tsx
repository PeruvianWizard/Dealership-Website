"use client"

import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';

const sessionContext = createContext<any>(null);

export default function SessionProvider({ children }: { children: React.ReactNode}) {
    const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data);
  }

  useEffect(() => {
    fetchSession();
  }, []);

  return(
    <sessionContext.Provider value={session}>
        {children}
    </sessionContext.Provider>
  );
}

export const useSession = () => useContext(sessionContext);