"use client"

import React, { useState} from 'react';

export function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Log in!");
    };

    return (
        <form onSubmit={onSubmit} className='space-y-12 w-full sm:w-[400px]'>
            <div className='grid w-full items-center gap-1.5'>
                <h1>Email</h1>
                <input 
                  className='w-full my-2 rounded py-input px-input'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder='johndoe@example.com'
                />
                <h1>Password</h1>
                <input 
                  className='w-full my-2 rounded py-input'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  type="password"
                />
                <div className='flex justify-center'>
                    <button type='submit' className='w-half bg-blue h-10 rounded'>
                        Sign In
                    </button>
                </div>
            </div>
        </form>
    );
}