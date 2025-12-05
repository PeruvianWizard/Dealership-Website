"use client"

import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css'
import { useSession } from './SessionProvider';

const Navbar = () => {
    const { session } = useSession();
    const user = session?.user;

    console.log(user?.email);

    return (
        <div>
            <nav className={styles.bar}>
                <div className={styles.container}>
                    <Link className={styles.title}href="/dealershipsPage">
                        Dealerships List
                    </Link>
                    {user ? (
                        <Link className={styles.title} href="/profile">
                            Profile
                        </Link>
                    ) : (
                        <Link className={styles.title} href="/login">
                            Login
                        </Link>
                    )}
                    <Link className={styles.title} href="/admin">
                        Admin Page
                    </Link>
                    
                </div>                    
            </nav>   
        </div>
    );
}

export default Navbar;