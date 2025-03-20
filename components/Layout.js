import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import '../styles/globals.css';

const Layout = ({ children, title = 'Koslo - Synthetic Rubber Trading' }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Head>
                <title>{title}</title>
                <meta name="description" content="Synthetic rubber trading platform" />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </Head>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                {children}
            </main>
            <footer className="bg-gray-800 text-gray-300 py-6 border-t border-gray-700">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm">&copy; {new Date().getFullYear()} Koslo Trading. All rights reserved.</p>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
