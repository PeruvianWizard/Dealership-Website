"use client"

import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabaseClient';

const sessionContext = createContext<any>(null);

export default function SessionProvider({ children }: { children: React.ReactNode}) {
    const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  }

  useEffect(() => {
    fetchSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })

    return () => {
      listener.subscription.unsubscribe();
    }
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return(
    <sessionContext.Provider value={{session, logout}}>
        {children}
    </sessionContext.Provider>
  );
}

export const useSession = () => useContext(sessionContext);