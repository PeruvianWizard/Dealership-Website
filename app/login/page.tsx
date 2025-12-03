import React from 'react';
import Link from 'next/link';
import styles from  './Login.module.css';
import { Form } from '@/app/login/form';

export default function Login() {
    return(
        <div className='h-screen w-screen flex justify-center items-center bg-slate-100'>
            <div className='sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-8'>
                <h1 className='font-semibold text-2xl'>Login</h1>
                <Form />
                <p className='text-center'>
                    Need to create an account?{' '}
                    <Link className='text-blue-500 hover:underline' href={'/register'}>Create an account</Link>
                </p>
            </div>
        </div>
    );
}