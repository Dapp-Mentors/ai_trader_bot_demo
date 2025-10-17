// app/features/page.tsx
"use client";

import React from 'react';
import { FaBrain, FaLock, FaBolt, FaChartBar, FaMobileAlt, FaUsers } from 'react-icons/fa';
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

const FeaturesPage: React.FC = () => {
    const features = [
        {
            title: 'Multi-Signal AI Trading',
            description: 'Synthesizes technical analysis (EMA-20, RSI-14, MACD), Random Forest ML predictions (100 trees, 80/20 split), NLP sentiment from news, and LLM reasoning for informed BUY/SELL/HOLD signals.',
            icon: FaBrain,
            gradient: 'from-purple-600 to-pink-600',
            iconColor: 'text-purple-400'
        },
        {
            title: 'Proportional Pool Ownership',
            description: 'Contribute to shared capital pools per cryptocurrency for diversified exposure; atomic MongoDB tracking ensures fair distribution of realized/unrealized gains with 0.05% trading fees.',
            icon: FaUsers,
            gradient: 'from-cyan-600 to-blue-600',
            iconColor: 'text-cyan-400'
        },
        {
            title: 'Adaptive Risk Management',
            description: 'Volatility-tiered position sizing (40-80% of capital), ATR-based trailing stops (2x ATR), 15-min cool-down periods, and tiered profit-taking (1-7% margins) protect against drawdowns.',
            icon: FaLock,
            gradient: 'from-pink-600 to-purple-600',
            iconColor: 'text-pink-400'
        },
        {
            title: 'Automated Trading Lifecycle',
            description: 'CoinTrader orchestrates data collection, analysis, decision-making, and execution via FastAPI and APScheduler; integrates Ollama for LLM recommendations with thread-safe persistence.',
            icon: FaBolt,
            gradient: 'from-purple-600 to-cyan-600',
            iconColor: 'text-purple-400'
        },
        {
            title: 'Real-Time Performance Insights',
            description: 'Next.js dashboard with Recharts visualizations for portfolio breakdowns, historical snapshots, and metrics like Sharpe ratio; supports individual and global profit tracking.',
            icon: FaChartBar,
            gradient: 'from-cyan-600 to-pink-600',
            iconColor: 'text-cyan-400'
        },
        {
            title: 'Secure & Compliant Access',
            description: 'Google OAuth authentication with JWT; non-custodial design, role-based access, and planned KYC/AML via Sumsub; responsive TypeScript interface for seamless deposits/withdrawals.',
            icon: FaMobileAlt,
            gradient: 'from-pink-600 to-blue-600',
            iconColor: 'text-pink-400'
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
                            <span className="text-white">Platform</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient block sm:inline"> Features</span>
                        </h1>
                        <p className="text-lg sm:text-2xl text-gray-300 max-w-5xl mx-auto px-2 sm:px-0">Cutting-edge AI and blockchain integration for transparent, automated crypto investing—outperforming buy-and-hold with simulated Sharpe ratios up to 2.1.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl from-purple-500/50 to-cyan-500/50" />
                                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8 h-full hover:border-purple-500/50 transition-all duration-500">

                                    {/* Responsive icon alignment */}
                                    <div className="flex justify-center sm:justify-start">
                                        <div
                                            className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500`}
                                        >
                                            <feature.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.iconColor}`} />
                                        </div>
                                    </div>

                                    {/* Title and Description */}
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center sm:text-left">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-center sm:text-left px-2 sm:px-0">
                                        {feature.description}
                                    </p>
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

export default FeaturesPage;