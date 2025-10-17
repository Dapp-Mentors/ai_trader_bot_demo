'use client';

import { useAuth } from '@/hooks/userAuth';
import React, { useState, useEffect } from 'react';
import ProfileModal from './ProfileModal';
import Link from 'next/link';
import { FaBrain, FaChartLine, FaWallet } from 'react-icons/fa';
import { MdAccountCircle, MdLogout } from 'react-icons/md';
import { IoClose, IoMenu } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };


    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setShowNotifications(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/features', label: 'Features' },
        { href: '/whitepaper', label: 'Whitepaper' },
        { href: '/roadmap', label: 'Roadmap' },
        { href: '/dashboard', label: 'Dashboard' },
    ];

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-purple-500/20 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link href="/dashboard" className="relative group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3"
                            >
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50"
                                >
                                    <FaBrain className="w-5 h-5 text-white" />
                                </motion.div>
                                <div>
                                    <span className="text-2xl font-black">
                                        <span className="text-white">Quantum</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                            Pool
                                        </span>
                                    </span>
                                    <p className="text-[10px] text-gray-400 font-semibold -mt-1">Dashboard</p>
                                </div>
                            </motion.div>
                            {/* Glow effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-cyan-500/0 rounded-lg blur-xl"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>

                        {/* Desktop Right side actions */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Quick Stats */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="flex items-center gap-6 mr-4"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                                    <FaChartLine className="w-4 h-4 text-green-400" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-semibold">Portfolio</p>
                                        <p className="text-sm font-bold text-green-400">+12.5%</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl">
                                    <FaWallet className="w-4 h-4 text-cyan-400" />
                                    <div>
                                        <p className="text-[10px] text-gray-400 font-semibold">Balance</p>
                                        <p className="text-sm font-bold text-cyan-400">$24,580</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* User Profile */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleModal}
                                    className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all duration-300 group"
                                >
                                    <div className="text-right hidden sm:block">
                                        <p className="text-white font-semibold text-sm">
                                            {user?.name.split(' ')[0]}
                                        </p>
                                        <p className="text-gray-400 text-xs">View Profile</p>
                                    </div>
                                    <motion.div
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-10 h-10 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50"
                                    >
                                        <MdAccountCircle className="w-6 h-6 text-white" />
                                    </motion.div>
                                </motion.button>
                            </motion.div>

                            {/* Logout Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={logout}
                                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30 rounded-xl hover:border-red-500/50 text-red-400 hover:text-red-300 font-semibold transition-all duration-300 group"
                                >
                                    <MdLogout className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                    <span className="hidden lg:inline">Logout</span>
                                </motion.button>
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
                                                className={`block px-4 py-3 mx-2 rounded-lg font-semibold transition-all duration-300 ${window.location.pathname === link.href
                                                    ? 'text-purple-400 bg-purple-500/20'
                                                    : 'text-gray-300 hover:text-white hover:bg-purple-500/10'
                                                    }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {/* Mobile Quick Stats */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                                        className="px-4 py-3 space-y-2"
                                    >
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                                            <FaChartLine className="w-4 h-4 text-green-400" />
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-semibold">Portfolio</p>
                                                <p className="text-sm font-bold text-green-400">+12.5%</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl">
                                            <FaWallet className="w-4 h-4 text-cyan-400" />
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-semibold">Balance</p>
                                                <p className="text-sm font-bold text-cyan-400">$24,580</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Mobile Profile and Logout */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: (navLinks.length + 2) * 0.05 }}
                                        className="px-4 py-3 space-y-2"
                                    >
                                        <button
                                            onClick={toggleModal}
                                            className="w-full flex items-center justify-center gap-3 p-3 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-xl hover:border-purple-500/50 transition-all duration-300"
                                        >
                                            <MdAccountCircle className="w-5 h-5 text-purple-400" />
                                            <span className="text-left">
                                                <p className="font-semibold text-white text-sm">{user?.name.split(' ')[0]}</p>
                                                <p className="text-gray-400 text-xs">View Profile</p>
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                logout();
                                                closeMobileMenu();
                                            }}
                                            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30 rounded-xl hover:border-red-500/50 text-red-400 hover:text-red-300 font-semibold transition-all duration-300"
                                        >
                                            <MdLogout className="w-5 h-5" />
                                            Logout
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.header>

            {/* Profile Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center"
                        onClick={toggleModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ProfileModal
                                onClose={toggleModal}
                                onSubmitAddress={(address: string) => {
                                    console.log('Wallet address submitted:', address);
                                    toggleModal();
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Click outside to close notifications */}
            {showNotifications && !isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                />
            )}
        </>
    );
};

export default Header;