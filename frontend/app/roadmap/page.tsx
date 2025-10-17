// app/roadmap/page.tsx
"use client";

import React from 'react';
import { FaCheckCircle, FaGem, FaRocket, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

const RoadmapPage: React.FC = () => {
    const roadmap = [
        {
            period: 'Short-Term (3-6 Months)',
            title: 'Enhanced Core Features',
            milestones: ['Add LSTM models to trading strategies', 'Comprehensive backtesting framework', 'Custom risk profiles for users', 'Mobile optimization and notifications', 'Support for top 50 coins', 'Tax export tools and referral system'],
            icon: FaGem,
            color: 'from-purple-600 to-pink-600'
        },
        {
            period: 'Medium-Term (6-12 Months)',
            title: 'Advanced Analytics & Compliance',
            milestones: ['Sharpe/Sortino ratios and drawdown analytics', 'Institutional features: multi-accounts and API access', 'KYC/AML integration with third-party verification', 'Real-time monitoring and alerts'],
            icon: FaRocket,
            color: 'from-cyan-600 to-blue-600'
        },
        {
            period: 'Long-Term (12+ Months)',
            title: 'Decentralization & Ecosystem Growth',
            milestones: ['Smart contract migration for decentralization', 'QPOOL token launch with governance and staking', 'Reinforcement learning AI upgrades and NLP queries', 'DeFi yield integrations and cross-chain support'],
            icon: FaGlobe,
            color: 'from-pink-600 to-purple-600'
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
                            <span className="text-white">Product</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient block sm:inline"> Roadmap</span>
                        </h1>
                        <p className="text-lg sm:text-2xl text-gray-300 max-w-4xl mx-auto px-2 sm:px-0">Phased milestones to production readiness and beyond—leveraging $1.5M funding for scalability, compliance, and DeFi innovation in AI-powered crypto pooling.</p>
                    </motion.div>
                    <div className="relative">
                        <motion.div
                            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 to-cyan-500 h-full z-0 hidden sm:block"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                        {roadmap.map((phase, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className={`relative z-10 mb-12 sm:mb-16 flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}
                            >
                                <div className={`w-full sm:w-1/2 ${index % 2 === 0 ? 'sm:pl-8' : 'sm:pr-8'}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className={`bg-gradient-to-br ${phase.color}/10 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8 h-full relative overflow-hidden group`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl from-purple-500/50 to-cyan-500/50" />
                                        <div className="relative">
                                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-4 mb-4 sm:mb-6">
                                                <motion.div
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500`}
                                                >
                                                    <phase.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                                </motion.div>
                                                <div className="text-center sm:text-left">
                                                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{phase.title}</h3>
                                                    <p className="text-purple-400 font-semibold text-sm sm:text-base">{phase.period}</p>
                                                </div>
                                            </div>
                                            <ul className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base">
                                                {phase.milestones.map((milestone, mIndex) => (
                                                    <motion.li
                                                        key={mIndex}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        transition={{ duration: 0.5, delay: mIndex * 0.1 }}
                                                        viewport={{ once: true }}
                                                        className="flex items-start gap-3 group-hover:translate-x-2 transition-transform px-2 sm:px-0"
                                                    >
                                                        <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                                                        <span className="flex-1">{milestone}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}

                    </div>
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

export default RoadmapPage;