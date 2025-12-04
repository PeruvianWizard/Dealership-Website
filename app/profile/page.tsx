"use client"

import React from 'react';
import { useSession } from '../components/SessionProvider';
import { useRouter } from 'next/navigation';

export default function Profile() {
    const { logout } = useSession();
    const router = useRouter();

    return(
        <div>
            <button onClick={() => {logout(); router.push('/login')}}>
                Logout
            </button>
        </div>
    );
}