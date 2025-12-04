import React from 'react';
import Link from 'next/link';
import styles from  './Login.module.css';
import { Form } from './form';

export default function Register() {
    return(
        <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
            <div className='sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-8'>
                <h1 className='font-semibold text-2xl'>Register</h1>
                <Form />
                <p className='text-center'>
                    Already have an account?{' '}
                    <Link className='text-blue-500 hover:underline' href={'/login'}>Sign in!</Link>
                </p>
            </div>
        </div>
    );
}