'use client';

import Link from 'next/link';
import React from 'react';
import { FaTwitter, FaDiscord, FaLinkedin, FaGithub, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
    const footerLinks = {
        Platform: [
            { label: 'Features', href: '/features' },
            { label: 'Whitepaper', href: '/whitepaper' },
            { label: 'Roadmap', href: '/roadmap' },
            { label: 'Dashboard', href: '/dashboard' },
        ],
        Company: [
            { label: 'About Us', href: '/about' },
            { label: 'Dapp Mentors', href: 'https://dappmentors.org' },
            { label: 'Blog', href: '/blog' },
            { label: 'Careers', href: '/careers' },
        ],
        // Resources: [
        //     { label: 'Documentation', href: '/docs' },
        //     { label: 'API Reference', href: '/api' },
        //     { label: 'Support', href: '/support' },
        //     { label: 'Community', href: '/community' },
        // ],
        // Legal: [
        //     { label: 'Privacy Policy', href: '/privacy' },
        //     { label: 'Terms of Service', href: '/terms' },
        //     { label: 'Cookie Policy', href: '/cookies' },
        //     { label: 'Disclaimer', href: '/disclaimer' },
        // ],
    };

    const socialLinks = [
        {
            icon: FaTwitter,
            href: 'https://twitter.com/iDaltonic',
            label: 'Twitter',
            color: 'from-blue-400 to-cyan-500',
            hoverColor: 'hover:shadow-blue-500/50'
        },
        {
            icon: FaDiscord,
            href: 'https://discord.gg/PgFDUVT6n9',
            label: 'Discord',
            color: 'from-indigo-400 to-purple-500',
            hoverColor: 'hover:shadow-indigo-500/50'
        },
        {
            icon: FaLinkedin,
            href: 'https://www.linkedin.com/company/dappmentors',
            label: 'LinkedIn',
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:shadow-blue-600/50'
        },
        {
            icon: FaGithub,
            href: 'https://github.com/Daltonic',
            label: 'GitHub',
            color: 'from-gray-400 to-gray-600',
            hoverColor: 'hover:shadow-gray-500/50'
        },
    ];

    return (
        <footer className="relative bg-gradient-to-b from-slate-900 via-purple-950/30 to-slate-950 border-t border-purple-500/20 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Main footer content */}
                <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50"
                                >
                                    <FaBrain className="w-6 h-6 text-white" />
                                </motion.div>
                                <div>
                                    <h3 className="text-2xl font-black">
                                        <span className="text-white">Quantum</span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Pool</span>
                                    </h3>
                                    <p className="text-xs text-gray-400 font-semibold">AI-Powered Trading</p>
                                </div>
                            </div>

                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Democratizing access to sophisticated cryptocurrency trading through AI and machine learning. Built by{' '}
                                <span className="text-purple-400 font-semibold">Dapp Mentors</span>—pioneering blockchain education since 2022.
                            </p>

                            {/* Social Links */}
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`group relative p-3 rounded-xl bg-gradient-to-br ${social.color} transition-all duration-300 hover:shadow-lg ${social.hoverColor}`}
                                    >
                                        <social.icon className="w-5 h-5 text-white relative z-10" />
                                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([title, links], sectionIndex) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <h4 className="text-white font-bold mb-6 text-lg relative inline-block">
                                {title}
                                <motion.span
                                    className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: 48 }}
                                    transition={{ duration: 0.6, delay: sectionIndex * 0.1 + 0.3 }}
                                    viewport={{ once: true }}
                                />
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link, linkIndex) => (
                                    <motion.li
                                        key={linkIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link
                                            href={link.href}
                                            className="group relative text-gray-400 hover:text-white transition-colors duration-300 inline-block"
                                        >
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Newsletter Section */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="py-12 border-t border-purple-500/20"
                >
                    <div className="max-w-2xl mx-auto text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Stay Updated with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">QuantumPool</span>
                        </h3>
                        <p className="text-gray-400 mb-6">Get the latest updates on AI trading strategies, market insights, and platform features.</p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-3 bg-slate-800/50 border border-purple-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-all duration-300"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <FaRocket className="w-4 h-4" />
                                Subscribe
                            </motion.button>
                        </div>
                    </div>
                </motion.div> */}

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="py-8 flex justify-center items-center gap-4 border-t border-purple-500/20"
                >
                    <div className="text-gray-400 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} <span className="text-purple-400 font-semibold">Dapp Mentors</span>.
                        QuantumPool Trader built on Ethereum. All rights reserved.
                    </div>
                    {/* <div className="flex gap-6 text-gray-400 text-sm">
                        <Link href="/terms" className="hover:text-purple-400 transition-colors duration-300">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:text-purple-400 transition-colors duration-300">
                            Privacy
                        </Link>
                        <Link href="/cookies" className="hover:text-purple-400 transition-colors duration-300">
                            Cookies
                        </Link>
                    </div> */}
                </motion.div>
            </div>

            {/* Animated gradient line at bottom */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
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
        </footer>
    );
};

export default Footer;