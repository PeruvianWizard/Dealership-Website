import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <div>
            <nav className={styles.bar}>
                <div className={styles.container}>
                    <Link className={styles.title}href="/dealershipsPage">
                        Dealerships List
                    </Link>
                    <Link className={styles.title} href="/login">
                        Login
                    </Link>
                </div>                    
            </nav>   
        </div>
    );
}

export default Navbar;