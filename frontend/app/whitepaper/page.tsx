// app/whitepaper/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SiEthereum, SiBinance, SiSolana } from 'react-icons/si';

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

const WhitepaperPage: React.FC = () => {
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
                            <span className="text-white">QuantumPool</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient block sm:inline"> Whitepaper</span>
                        </h1>
                        <p className="text-lg sm:text-2xl text-gray-300 max-w-4xl mx-auto px-2 sm:px-0">Decentralized AI-Powered Cryptocurrency Investment Platform | Version 1.3 - October 2025</p>
                    </motion.div>
                    <div className="space-y-8 sm:space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8"
                        >
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-2xl sm:text-4xl text-purple-400">01</span> Executive Summary
                            </h2>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed px-2 sm:px-0">
                                QuantumPool is an innovative decentralized investment platform that democratizes access to sophisticated cryptocurrency trading strategies through artificial intelligence and machine learning. Users pool capital into shared investment vehicles leveraging algorithmic trading, sentiment analysis, and predictive modeling. Developed by Dapp Mentors, a blockchain education leader founded in 2022 with expertise mentoring over 5,500 developers, QuantumPool seeks $1.5M in funding to achieve production readiness, targeting operational profitability within 18-24 months through transparent proportional ownership and real-time analytics.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8"
                        >
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-2xl sm:text-4xl text-purple-400">02</span> Market Opportunity
                            </h2>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                The global DeFi and AI-driven trading market is expanding rapidly, with cryptocurrency trading volumes reaching $200-300 billion daily in 2025 and DeFi TVL surpassing $150 billion. AI integration in finance is projected to grow to $190 billion by 2030. QuantumPool targets retail investors seeking passive, diversified crypto exposure, addressing challenges like technical complexity, time constraints, capital limitations, emotional trading, and information asymmetry through automated pooling and AI tools.
                            </p>
                            <div className="overflow-x-auto">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden border border-purple-500/20 rounded-2xl backdrop-blur-xl bg-slate-800/30">
                                        <table className="min-w-full text-sm">
                                            <thead className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                                                <tr>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Platform</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Key Features</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Fees</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">AI Integration</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Pooling/Transparency</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Limitations</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-purple-500/10">
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap text-white font-bold text-xs sm:px-6">3Commas</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Trading bots, signals</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">0.1-0.5%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Basic</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">No pooling</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Individual only, less transparent</td>
                                                </tr>
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap text-white font-bold text-xs sm:px-6">Yearn.finance</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Yield farming pools</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">0.5-2%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Minimal</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Yield-focused pooling</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">High risk, no AI trading</td>
                                                </tr>
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap text-white font-bold text-xs sm:px-6">SingularityNET</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">AI services marketplace</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Variable</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Advanced</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Partial (DAO governance)</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Focused on AI compute, limited trading</td>
                                                </tr>
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300 bg-purple-500/10">
                                                    <td className="px-2 py-3 whitespace-nowrap text-white font-bold text-xs sm:px-6">QuantumPool</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">AI/ML trading, sentiment analysis</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-green-400 font-bold text-xs sm:px-6">0.05%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-cyan-400 font-semibold text-xs sm:px-6">Advanced</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-cyan-400 font-semibold text-xs sm:px-6">Full proportional ownership</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">Simulated currently, scaling to production</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8"
                        >
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-2xl sm:text-4xl text-purple-400">03</span> Technology Architecture
                            </h2>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                <strong className="text-cyan-400">Backend (Python/FastAPI):</strong> RESTful APIs for authentication, trading, and data; MongoDB for persistent storage with atomic operations; APScheduler for automated jobs; Scikit-learn for Random Forest models; Ollama integration via LangChain for LLM decisions; External providers for cryptocurrency data and news.
                            </p>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                <strong className="text-cyan-400">Frontend (Next.js/React):</strong> Responsive dashboard with TypeScript; Tailwind CSS and Recharts for design and visualization; Google OAuth for authentication; Real-time updates via Context API.
                            </p>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed px-2 sm:px-0">
                                <strong className="text-cyan-400">Infrastructure:</strong> Docker for deployment; Planned Redis for caching and Celery for queuing; Thread-safe singleton patterns in CapitalManager and CoinTrader for state management.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8"
                        >
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-2xl sm:text-4xl text-purple-400">04</span> AI Trading Engine
                            </h2>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                Hybrid multi-signal approach: Technical indicators (EMA-20, RSI-14, MACD), Random Forest ML predictions (100 trees, 80/20 split), NLP sentiment analysis on news, and LLM reasoning for BUY/SELL/HOLD decisions.
                            </p>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                Risk management: ATR-based trailing stops (2x ATR), volatility-tiered position sizing (40-80% based on signal strength), 15-min cool-downs, tiered profit-taking (1-7% margins), and time-based rebalancing (10% partial sells after 5 days).
                            </p>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                Backtested performance (Sep 15-Oct 15, 2025) shows outperformance vs. buy-and-hold, with long-term projections ~22% annualized returns and Sharpe ratios up to 2.1 across ETH, BNB, and SOL simulations.
                            </p>
                            <div className="overflow-x-auto mt-4 sm:mt-6">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden border border-purple-500/20 rounded-2xl backdrop-blur-xl bg-slate-800/30">
                                        <table className="min-w-full text-sm">
                                            <thead className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                                                <tr>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Asset</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Initial Investment</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Total Return</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Buy-and-Hold Return</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Sharpe Ratio</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Max Drawdown</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Win Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-purple-500/10">
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap sm:px-6">
                                                        <div className="flex items-center gap-2 sm:gap-3">
                                                            <SiEthereum className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                                                            <span className="text-white font-bold text-xs sm:text-base">ETH</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$12,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-green-400 font-bold text-xs sm:px-6">57.36%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">-9%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-cyan-400 font-semibold text-xs sm:px-6">2.1</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-400 text-xs sm:px-6">-15.4%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">62%</td>
                                                </tr>
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap sm:px-6">
                                                        <div className="flex items-center gap-2 sm:gap-3">
                                                            <SiBinance className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400" />
                                                            <span className="text-white font-bold text-xs sm:text-base">BNB</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$17,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-green-400 font-bold text-xs sm:px-6">58.87%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">+30.3%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-cyan-400 font-semibold text-xs sm:px-6">2.1</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-400 text-xs sm:px-6">-4.2%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">68%</td>
                                                </tr>
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap sm:px-6">
                                                        <div className="flex items-center gap-2 sm:gap-3">
                                                            <SiSolana className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
                                                            <span className="text-white font-bold text-xs sm:text-base">SOL</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$11,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-green-400 font-bold text-xs sm:px-6">19.1%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">-16.2%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-cyan-400 font-semibold text-xs sm:px-6">1.2</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-400 text-xs sm:px-6">-23.5%</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">N/A</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8"
                        >
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-2xl sm:text-4xl text-purple-400">05</span> Security & Compliance
                            </h2>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                Non-custodial design with no asset custody; Decimal precision and atomic MongoDB updates for integrity; Thread-safe locking and audit trails prevent errors and abuse; Proportional withdrawals with 0.05% fees.
                            </p>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed px-2 sm:px-0">
                                Authentication via Google OAuth 2.0 and JWT; Production KYC/AML via third-party (e.g., Sumsub) with ID verification, sanctions screening, and geo-fencing; HTTPS, CORS, and role-based access ensure data privacy and compliance; Incorporated in Delaware for U.S. regulatory alignment.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8"
                        >
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-2xl sm:text-4xl text-purple-400">06</span> Development Roadmap
                            </h2>
                            <ul className="space-y-3 sm:space-y-4 text-base sm:text-xl text-gray-300">
                                <li className="flex items-center gap-2 sm:gap-3 px-2 sm:px-0"><FaCheckCircle className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" /> Short-Term (3-6 Months): Enhanced strategies (LSTM, backtesting), mobile optimization, notifications, top 50 coins support, tax exports.</li>
                                <li className="flex items-center gap-2 sm:gap-3 px-2 sm:px-0"><FaCheckCircle className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" /> Medium-Term (6-12 Months): Advanced analytics (Sharpe/Sortino, drawdown), institutional features (multi-accounts, API), KYC/AML integration.</li>
                                <li className="flex items-center gap-2 sm:gap-3 px-2 sm:px-0"><FaCheckCircle className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" /> Long-Term (12+ Months): Decentralization via smart contracts, QPOOL tokenization, governance, reinforcement learning, DeFi cross-chain integrations.</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8"
                        >
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-2xl sm:text-4xl text-purple-400">07</span> Token Economics
                            </h2>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                Planned native QPOOL token (100M total supply) for long-term decentralization: 40% community/liquidity, 20% team (vested 2 years), 20% development, 10% marketing, 10% reserves.
                            </p>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6 px-2 sm:px-0">
                                Utility includes fee discounts, staking rewards, and voting on strategies; Tied to smart contract migration post-production, aligning incentives for governance and ecosystem growth.
                            </p>
                            <div className="overflow-x-auto mt-4 sm:mt-6">
                                <div className="inline-block min-w-full align-middle">
                                    <div className="overflow-hidden border border-purple-500/20 rounded-2xl backdrop-blur-xl bg-slate-800/30">
                                        <table className="min-w-full text-sm">
                                            <thead className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                                                <tr>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Scenario</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Year 1 Users</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Total TVL</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Revenue (Fees)</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Operating Costs</th>
                                                    <th className="px-2 py-3 text-left text-xs font-bold text-purple-400 uppercase tracking-wider sm:px-6">Net Profit</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-purple-500/10">
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap text-white font-bold text-xs sm:px-6">Conservative</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">500</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$3.75M</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$75,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$150,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-red-400 text-xs sm:px-6">-$75,000</td>
                                                </tr>
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap text-white font-bold text-xs sm:px-6">Base</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">1,500</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$11.25M</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$225,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$200,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-green-400 text-xs sm:px-6">$25,000</td>
                                                </tr>
                                                <tr className="hover:bg-purple-500/5 transition-colors duration-300">
                                                    <td className="px-2 py-3 whitespace-nowrap text-white font-bold text-xs sm:px-6">Optimistic</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">3,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$22.5M</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$450,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-gray-300 text-xs sm:px-6">$300,000</td>
                                                    <td className="px-2 py-3 whitespace-nowrap text-green-400 text-xs sm:px-6">$150,000</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-4 sm:p-8"
                        >
                            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start">
                                <span className="text-2xl sm:text-4xl text-purple-400">08</span> Conclusion
                            </h2>
                            <p className="text-base sm:text-xl text-gray-300 leading-relaxed px-2 sm:px-0">
                                QuantumPool redefines crypto investing by pooling resources with AI precision, offering transparent, automated growth through multi-layered strategies and user-centric design. Backed by Dapp Mentors&apos; expertise and a scalable roadmap, we seek $1.5M to capture opportunities in the $200-300B daily trading market, empowering users with institutional-grade tools.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.6 }}
                            viewport={{ once: true }}
                            className="text-center mt-8 sm:mt-12"
                        >
                            <Link
                                href="https://dappmentors.org/s/gNoXJ1"
                                target='_blank'
                                className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto max-w-xs mx-auto"
                            >
                                <span className="relative z-10">Download Full Whitepaper</span>
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

export default WhitepaperPage;