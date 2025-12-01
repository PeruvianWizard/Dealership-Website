import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div>
            <nav className='navbar navbar-expand-lg
                            navbar-light bg-light
                            bg-opacity-75 text-light'>
                <div className='container'>
                    <Link className='text-light font-bold'
                        href="/dealershipsPage">
                        Dealerships List
                    </Link>
                </div>                    
            </nav>   
        </div>
    );
}

export default Navbar;