import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <ul className="flex space-x-4">
                <li><Link href="/">Dashboard</Link></li>
                <li><Link href="/price-charts">Price Charts</Link></li>
                <li><Link href="/order-management">Order Management</Link></li>
                <li><Link href="/inventory-tracking">Inventory Tracking</Link></li>
                <li><Link href="/auth">User Authentication</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
