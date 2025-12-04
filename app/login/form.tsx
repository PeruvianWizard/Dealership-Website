"use client"

import { supabase } from '@/lib/supabaseClient';
import React, { useState} from 'react';
import { useRouter } from 'next/navigation';

export function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        //TO-DO: Verify user with database
        const { error } = await supabase.auth.signInWithPassword({email, password})

        if (error) {
            console.error('Error signing in:', error);
            return <div className="p-8 text-red-600">Error signing in customer.</div>;
        }

        console.log("Customer logged in!");
        router.push('/dealershipsPage');
    };

    return (
        <form onSubmit={onSubmit} className='space-y-12 w-full sm:w-[400px]'>
            <div className='grid w-full items-center gap-1.5'>
                <h1>Email</h1>
                <input 
                  className='w-full my-2 rounded py-input px-input border-1px-black'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder='e.g. johndoe@example.com'
                />
                <h1>Password</h1>
                <input 
                  className='w-full my-2 rounded py-input px-input border-1px-black'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                />
                <div className='flex justify-center'>
                    <button type='submit' className='w-half bg-blue h-10 rounded text-white'>
                        Sign In
                    </button>
                </div>
            </div>
        </form>
    );
}