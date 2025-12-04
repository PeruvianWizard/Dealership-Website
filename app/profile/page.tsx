"use client"

import React from 'react';
import { useSession } from '../components/SessionProvider';
import { useRouter } from 'next/navigation';
import VehiclesBoughtCard from './vehiclesBoughtCard';

export default function Profile() {
    const { session, logout, deleteAccount } = useSession();
    const router = useRouter();

    return(
        <div className='p-8 h-screen w-screen justify-center flex bg-slate-100'>
            <div className='sm:w-[400px] sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-8'>
                <div className='flex flex-column items-center space-y-8'>
                    <div className='flex flex-row'>
                        <VehiclesBoughtCard />
                    </div>
                    <button className='bg-blue h-10 rounded text-white px-8' onClick={() => {logout(); router.push('/login')}}>
                        Logout
                    </button>
                    <button className='bg-red h-10 rounded text-white px-8' onClick={() => {deleteAccount(session?.user.id); router.push('/login')}}>
                        Delete Account
                    </button>
                </div>
            </div>  
        </div>
    );
}