"use client"

import { supabase } from '@/lib/supabaseClient';
import React, { useState} from 'react';

export function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [last, setLast] = useState('');
    const [phone, setPhone] = useState('');

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { error } = await supabase
            .from("customer")
            .insert({firstname: name,
                     lastname: last,
                     phone: phone,
                     email: email,
                     password: password})
            .single();

        if (error) {
            console.error('Error adding new customer:', error);
            return <div className="p-8 text-red-600">Error registering customer.</div>;
        }

        console.log("Customer registered successfully!")
    };

    return (
        <form onSubmit={onSubmit} className='space-y-12 w-full sm:w-[400px]'>
            <div className='grid w-full items-center gap-1.5'>
                <h1>First Name</h1>
                <input 
                  className='w-full my-2 rounded py-input px-input border-1px-black'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="fname"
                  type="fname"
                  placeholder='e.g. John'
                />
                <h1>Last Name</h1>
                <input 
                  className='w-full my-2 rounded py-input px-input border-1px-black'
                  required
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                  id="lname"
                  type="lname"
                  placeholder='e.g. Doe'
                />
                <h1>Phone Number</h1>
                <input 
                  className='w-full my-2 rounded py-input px-input border-1px-black'
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="pnum"
                  type="pnum"
                  placeholder='e.g. 5552227777'
                />
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
                  placeholder='Insert 8 character long password'
                />
                <div className='flex justify-center'>
                    <button type='submit' className='w-half bg-blue h-10 rounded'>
                        Register
                    </button>
                </div>
            </div>
        </form>
    );
}