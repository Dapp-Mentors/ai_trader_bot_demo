'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/userAuth';
import React, { useState, useEffect } from 'react';
import GoogleSignInButton from './GoogleSignInButton';
import { FaBrain } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { IoClose, IoMenu } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/features', label: 'Features' },
        { href: '/whitepaper', label: 'Whitepaper' },
        { href: '/roadmap', label: 'Roadmap' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-slate-950/95 backdrop-blur-2xl border-b border-purple-500/30 shadow-2xl shadow-purple-500/10'
                : 'bg-slate-950/80 backdrop-blur-xl border-b border-purple-500/10'
                }`}
        >
            {/* Animated gradient line at top */}
            <motion.div
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                animate={{
                    opacity: [0.3, 0.8, 0.3],
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{ backgroundSize: '200% 100%' }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href="/" className="relative group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <motion.div
                                animate={{
                                    rotate: [0, 5, 0, -5, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <FaBrain className="w-8 h-8 text-purple-400" />
                            </motion.div>
                            <span className="text-2xl md:text-3xl font-black">
                                <span className="text-white">Quantum</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                    Pool
                                </span>
                            </span>
                        </motion.div>
                        {/* Glow effect on hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-cyan-500/0 rounded-lg blur-xl"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className={`relative px-4 py-2 font-semibold transition-all duration-300 group ${pathname === link.href
                                        ? 'text-purple-400'
                                        : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                    {/* Underline animation */}
                                    <motion.span
                                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 ${pathname === link.href ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                    {/* Glow on hover */}
                                    <motion.span
                                        className="absolute inset-0 bg-purple-500/10 rounded-lg blur-lg"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </Link>
                            </motion.div>
                        ))}

                        {/* Auth buttons */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                            className="ml-4"
                        >
                            {!user ? (
                                <GoogleSignInButton />
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/dashboard"
                                        className="relative px-4 py-2 font-semibold text-gray-300 hover:text-white transition-all duration-300 group"
                                    >
                                        Dashboard
                                        <motion.span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0"
                                            whileHover={{ opacity: 1 }}
                                        />
                                    </Link>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={logout}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                                    >
                                        <MdAccountCircle className="w-5 h-5" />
                                        Logout
                                    </motion.button>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMobileMenu}
                        className="md:hidden relative z-50 p-2 text-white hover:bg-purple-500/20 rounded-lg transition-all duration-300"
                        aria-label="Toggle mobile menu"
                    >
                        <AnimatePresence mode="wait">
                            {isMobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <IoClose className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <IoMenu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="pb-6 space-y-2 bg-gradient-to-b from-slate-900/50 to-transparent backdrop-blur-lg rounded-b-2xl">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={closeMobileMenu}
                                            className={`block px-4 py-3 mx-2 rounded-lg font-semibold transition-all duration-300 ${pathname === link.href
                                                ? 'text-purple-400 bg-purple-500/20'
                                                : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}

                                {!user ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                                        className="px-4 py-3"
                                    >
                                        <GoogleSignInButton />
                                    </motion.div>
                                ) : (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                                        >
                                            <Link
                                                href="/dashboard"
                                                onClick={closeMobileMenu}
                                                className="block px-4 py-3 mx-2 rounded-lg font-semibold text-gray-300 hover:text-white hover:bg-purple-500/10 transition-all duration-300"
                                            >
                                                Dashboard
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: (navLinks.length + 1) * 0.05 }}
                                            className="px-4 py-3"
                                        >
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    closeMobileMenu();
                                                }}
                                                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                                            >
                                                <MdAccountCircle className="w-5 h-5" />
                                                Logout
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;