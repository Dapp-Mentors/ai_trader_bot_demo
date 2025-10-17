// app/about/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaArrowRight, FaUsers, FaAward, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Particle interface
interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    duration: number;
    delay: number;
    direction: number;
}

// Line interface
interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    duration: number;
}

// Intelligent Particle System (Reduced for mobile performance)
const IntelligentParticles = () => {
    const [particles, setParticles] = React.useState<Particle[]>([]);
    const particleCount = 25;

    React.useEffect(() => {
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            color: ['#00D4FF', '#9333EA', '#EC4899', '#8B5CF6', '#06B6D4'][Math.floor(Math.random() * 5)],
            duration: Math.random() * 20 + 15,
            delay: Math.random() * 5,
            direction: Math.random() * 360,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                    }}
                    initial={{ x: `${particle.x}vw`, y: `${particle.y}vh`, opacity: 0 }}
                    animate={{
                        x: [`${particle.x}vw`, `${(particle.x + 20) % 100}vw`, `${particle.x}vw`],
                        y: [`${particle.y}vh`, `${(particle.y + 30) % 100}vh`, `${particle.y}vh`],
                        opacity: [0, 0.6, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// Floating Neural Network Background (Reduced for mobile)
const NeuralNetwork = () => {
    const [lines, setLines] = React.useState<Line[]>([]);

    React.useEffect(() => {
        const newLines = Array.from({ length: 8 }).map(() => ({
            x1: Math.random() * 100,
            y1: Math.random() * 100,
            x2: Math.random() * 100,
            y2: Math.random() * 100,
            duration: 3 + Math.random() * 2,
        }));
        setLines(newLines);
    }, []);

    return (
        <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#9333EA', stopOpacity: 0.8 }} />
                        <stop offset="100%" style={{ stopColor: '#06B6D4', stopOpacity: 0.8 }} />
                    </linearGradient>
                </defs>
                {lines.map((line, i) => (
                    <motion.line
                        key={i}
                        x1={`${line.x1}%`}
                        y1={`${line.y1}%`}
                        x2={`${line.x2}%`}
                        y2={`${line.y2}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
                        transition={{
                            duration: line.duration,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatDelay: 1,
                        }}
                    />
                ))}
            </svg>
        </div>
    );
};

const Page: React.FC = () => {
    const team = [
        {
            name: 'Darlington Gospel',
            role: 'Project Lead, Founder/CEO of Dapp Mentors',
            bio: '8+ years in software development; blockchain expertise since 2020. Has built DeFi dApps on EVM and Solana; mentored 5,500+ developers. Leads backend architecture, AI integration, and blockchain network compatibility.',
            avatar: 'https://pbs.twimg.com/profile_images/1896624702652608512/lLPQXVu-.jpg',
            links: [{ icon: FaLinkedin, href: 'https://www.linkedin.com/in/darlington-gospel/' }]
        },
        {
            name: 'Ebenezer Enietan',
            role: 'Backend Developer, Founder/CEO of White Creativity',
            bio: '10+ years in full-stack development, blockchain, and tech education; proficient in Solidity and dApp development with extensive experience in the crypto space. Ensures robust PoC testing and optimization.',
            avatar: 'https://pbs.twimg.com/profile_images/1570503690049490949/SIfK6Bz5_400x400.jpg',
            links: [{ icon: FaLinkedin, href: 'https://www.linkedin.com/in/ebenezer-enietan-a97612119/' }]
        },
        {
            name: 'Bahiru Mulugeta',
            role: 'Technical Specialist, Freelance Developer',
            bio: '4+ years in frontend frameworks and API integrations. Develops intuitive user dashboards for PoC.',
            avatar: 'https://avatars.githubusercontent.com/u/57240268?v=4',
            links: [{ icon: FaLinkedin, href: 'https://www.linkedin.com/in/bahiru-mulugeta-60b40a194/' }]
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden relative">
            <IntelligentParticles />
            <NeuralNetwork />
            {/* Animated Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Glowing Orbs - Responsive */}
            <motion.div
                className="absolute top-4 left-4 w-48 h-48 sm:w-72 sm:h-72 sm:top-20 sm:left-10 bg-purple-500/30 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-4 right-4 w-64 h-64 sm:w-96 sm:h-96 sm:bottom-20 sm:right-10 bg-cyan-500/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />

            <section className="py-16 sm:py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12 sm:mb-20"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-4 sm:mb-6 leading-none">
                            <span className="text-white">About</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient block sm:inline"> Us</span>
                        </h1>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-2xl text-gray-300 text-center mb-12 sm:mb-20 max-w-5xl mx-auto px-2 sm:px-0"
                    >
                        Founded in 2022, Dapp Mentors is a leader in blockchain education and community building. With a track record of mentoring over 5,500 developers through bootcamps, courses, and articles across ecosystems like Ethereum, Solana, Alephium, and ICP—supported by grants from Sia and Dfinity—we empower retail investors via QuantumPool&apos;s AI-driven, pooled crypto strategies.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto mb-12 sm:mb-20"
                    >
                        {[
                            { icon: FaUsers, label: '5,500+ Developers', value: 'Mentored' },
                            { icon: FaAward, label: '4+ Blockchains', value: 'Supported' },
                            { icon: FaBrain, label: 'AI-Driven', value: 'Strategies' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6 text-center"
                            >
                                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mx-auto mb-2 sm:mb-3" />
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.label}</h3>
                                <p className="text-gray-400 text-xs sm:text-sm">{stat.value}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="space-y-6 sm:space-y-8 order-2 lg:order-1"
                        >
                            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Mission</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed px-2 sm:px-0">
                                Democratize access to sophisticated AI trading tools and shared investment pools while fostering a global community of blockchain innovators. Through premium content on Solidity, Rust, AI agents, and dApp development, we drive decentralized education and sustainable crypto growth—seeking $1.5M to scale QuantumPool to profitability in 18-24 months.
                            </p>
                        </motion.div>
                        <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
                            {team.map((member, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                    className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-6 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl from-purple-500/50 to-cyan-500/50" />
                                    <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="relative flex-shrink-0"
                                        >
                                            <Image
                                                src={member.avatar}
                                                alt={member.name}
                                                width={96}
                                                height={96}
                                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-purple-500/50 group-hover:border-purple-400 transition-colors"
                                            />
                                        </motion.div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 truncate">{member.name}</h3>
                                            <p className="text-purple-400 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{member.role}</p>
                                            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{member.bio}</p>
                                            <div className="flex gap-2 mt-3 sm:mt-4">
                                                {member.links.map((link, lIndex) => (
                                                    <a key={lIndex} href={link.href} target='_blank' rel='noopener noreferrer' className="p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/40 transition-all group-hover:scale-110 flex-shrink-0">
                                                        <link.icon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <Link
                            href="/whitepaper"
                            className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 inline-flex items-center justify-center gap-2 sm:gap-3 mx-auto w-full sm:w-auto"
                        >
                            <span className="relative z-10">Read Our Whitepaper</span>
                            <FaArrowRight className="group-hover:translate-x-2 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600"
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </motion.div>
                </div>
            </section>

            <style jsx global>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </div>
    );
};

export default Page;