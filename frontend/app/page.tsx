'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaPlay, FaUsers, FaAward, FaBrain, FaChartLine, FaNetworkWired, FaLock, FaCog, FaDatabase, FaShieldAlt } from 'react-icons/fa';
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

// Intelligent Particle System (Reduced particle count for mobile performance)
const IntelligentParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleCount = 25; // Reduced for better mobile performance

  useEffect(() => {
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

// Floating Neural Network Background (Reduced lines for mobile)
const NeuralNetwork = () => {
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const newLines = Array.from({ length: 8 }).map(() => ({ // Reduced for performance
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

// Hero Section with Dynamic Elements
const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden">
      <IntelligentParticles />
      <NeuralNetwork />

      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Glowing Orbs - Responsive positioning */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10">
        <div className="text-center">
          {/* Badge - Responsive padding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-purple-500/20 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8"
          >
            <FaBrain className="text-purple-400 animate-pulse w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
              AI-Powered Crypto Trading
            </span>
            <motion.div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Main Title - Responsive sizes */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-4 sm:mb-6 leading-none"
          >
            <span className="text-white">Quantum</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient block sm:inline">
              Pool
            </span>
          </motion.h1>

          {/* Subtitle - Responsive sizes and padding */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-2 sm:mb-4 leading-relaxed px-2 sm:px-0"
          >
            Democratize access to <span className="text-cyan-400 font-semibold">sophisticated cryptocurrency trading</span> through AI and machine learning
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 px-2 sm:px-0"
          >
            Pool capital into shared investment vehicles with algorithmic trading, sentiment analysis, and predictive modeling for transparent, proportional returns
          </motion.p>

          {/* CTA Buttons - Responsive gap and sizes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16"
          >
            <Link
              href="/dashboard"
              className="group relative bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                Start Trading <FaArrowRight className="group-hover:translate-x-2 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <Link
              href="/whitepaper"
              className="group border-2 border-purple-400/50 text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-105 hover:border-purple-400 flex items-center justify-center gap-2 sm:gap-3 backdrop-blur-sm w-full sm:w-auto"
            >
              <FaPlay className="group-hover:scale-110 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
              View Whitepaper
            </Link>
          </motion.div>

          {/* Stats - Responsive grid and padding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: FaUsers, label: '5,500+ Developers', value: 'Community' },
              { icon: FaAward, label: '4+ Blockchains', value: 'Supported' },
              { icon: FaChartLine, label: '57% Average ROI', value: '30-Day Period' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-4 sm:p-6"
              >
                <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400 mx-auto mb-2 sm:mb-3" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">{stat.label}</h3>
                <p className="text-gray-400 text-xs sm:text-sm text-center">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Responsive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 2 }}
        className="absolute bottom-4 sm:bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-purple-400/50 rounded-full flex justify-center pt-1 sm:pt-2">
          <motion.div
            className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// Features Section with 3D Cards
const FeaturesSection = () => {
  const features = [
    {
      icon: FaLock,
      title: 'Secure & Transparent Pools',
      description: 'Non-custodial with proportional ownership. Track deposits, withdrawals, and gains via atomic operations. 0.05% fees ensure fair, audited distribution.',
      gradient: 'from-purple-600 to-pink-600',
      iconColor: 'text-purple-400',
    },
    {
      icon: FaBrain,
      title: 'Advanced AI Trading Engine',
      description: 'Multi-signal strategy with Random Forest ML predictions, NLP sentiment analysis, and technical indicators. ATR trailing stops optimize for Sharpe > 2.0.',
      gradient: 'from-cyan-600 to-blue-600',
      iconColor: 'text-cyan-400',
    },
    {
      icon: FaNetworkWired,
      title: 'Multi-Chain Integration',
      description: 'Trade across Ethereum, Binance Smart Chain, and Solana. Diversified strategies maximize opportunities in the evolving DeFi landscape.',
      gradient: 'from-pink-600 to-purple-600',
      iconColor: 'text-pink-400',
    },
  ];

  return (
    <section className="relative py-16 sm:py-32 bg-gradient-to-b from-slate-900 via-purple-950/30 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(147,51,234,0.1),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">QuantumPool</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Cutting-edge technology meets intuitive design for the ultimate trading experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-center sm:text-left">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base text-center sm:text-left">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Performance Section - Converted to responsive cards for mobile
const PerformanceSection = () => {
  const assets = [
    { name: 'ETH', icon: SiEthereum, return: '57.36%', buyHold: '-9%', sharpe: '2.1', drawdown: '-15.4%', color: 'text-purple-400' },
    { name: 'BNB', icon: SiBinance, return: '58.87%', buyHold: '+30.3%', sharpe: '2.1', drawdown: '-4.2%', color: 'text-yellow-400' },
    { name: 'SOL', icon: SiSolana, return: '19.1%', buyHold: '-16.2%', sharpe: '1.2', drawdown: '-23.5%', color: 'text-cyan-400' },
  ];

  return (
    <section className="relative py-16 sm:py-32 bg-gradient-to-b from-slate-900 to-purple-950/30 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Performance</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Real results from our AI-powered trading algorithms
          </p>
        </motion.div>

        {/* Mobile: Cards; Desktop: Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="overflow-x-auto hidden md:block"
        >
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-purple-500/20 rounded-2xl backdrop-blur-xl bg-slate-800/30">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-purple-400 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-purple-400 uppercase tracking-wider">Total Return</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-purple-400 uppercase tracking-wider">Buy-and-Hold</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-purple-400 uppercase tracking-wider">Sharpe Ratio</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-purple-400 uppercase tracking-wider">Max Drawdown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/10">
                  {assets.map((asset, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="hover:bg-purple-500/5 transition-colors duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <asset.icon className={`w-6 h-6 ${asset.color}`} />
                          <span className="text-white font-bold">{asset.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-400 font-bold">{asset.return}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">{asset.buyHold}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-cyan-400 font-semibold">{asset.sharpe}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400">{asset.drawdown}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Mobile Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:hidden grid grid-cols-1 gap-6"
        >
          {assets.map((asset, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:bg-purple-500/15 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <asset.icon className={`w-8 h-8 ${asset.color}`} />
                <span className="text-white font-bold text-lg">{asset.name}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Return</span>
                  <span className="text-green-400 font-bold">{asset.return}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Buy-and-Hold</span>
                  <span className="text-gray-300">{asset.buyHold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sharpe Ratio</span>
                  <span className="text-cyan-400 font-semibold">{asset.sharpe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Drawdown</span>
                  <span className="text-gray-400">{asset.drawdown}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-6 sm:mt-8 text-xs sm:text-sm"
        >
          Backtested Sep 15 - Oct 15, 2025. Long-term projections: ~22% annualized returns. Past performance is not indicative of future results.
        </motion.p>
      </div>
    </section>
  );
};

// How It Works
const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      icon: FaUsers,
      title: 'Deposit to Pool',
      description: 'Authenticate via Google OAuth, select your preferred cryptocurrency, and deposit USD equivalent into the shared pool with full KYC compliance.',
      gradient: 'from-purple-600 to-pink-600',
    },
    {
      number: '02',
      icon: FaCog,
      title: 'AI Executes Trades',
      description: 'Our advanced CoinTrader analyzes historical data, news sentiment, and market signals using ML and LLM for intelligent decision-making.',
      gradient: 'from-cyan-600 to-blue-600',
    },
    {
      number: '03',
      icon: FaChartLine,
      title: 'Track & Withdraw',
      description: 'Monitor real-time portfolio analytics, realized/unrealized gains, and performance metrics. Withdraw proportionally anytime with 0.05% fee.',
      gradient: 'from-pink-600 to-purple-600',
    },
  ];

  return (
    <section className="relative py-16 sm:py-32 bg-gradient-to-b from-purple-950/30 via-slate-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Three simple steps to start your AI-powered trading journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-500`}
              >
                <step.icon className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <div className="text-4xl sm:text-6xl font-black text-purple-500/20 mb-3 sm:mb-4">{step.number}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base px-2 md:px-0">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="relative py-16 sm:py-32 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 overflow-hidden">
      <div className="absolute inset-0 bg-black/30" />
      <IntelligentParticles />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
            Ready to Revolutionize Your Trading?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
            Join thousands of traders leveraging AI-powered strategies to maximize returns and minimize risk in the crypto markets.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link
              href="/dashboard"
              className="group relative bg-white text-purple-600 px-8 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                Start Trading Now <FaArrowRight className="group-hover:translate-x-2 transition-transform w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </Link>
            <Link
              href="/whitepaper"
              className="border-2 border-white text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Tech Stack Section
const TechStackSection = () => {
  const technologies = [
    { icon: FaBrain, name: 'Machine Learning', color: 'text-purple-400' },
    { icon: FaDatabase, name: 'Big Data Analytics', color: 'text-cyan-400' },
    { icon: FaNetworkWired, name: 'Blockchain', color: 'text-pink-400' },
    { icon: FaShieldAlt, name: 'Enterprise Security', color: 'text-blue-400' },
  ];

  return (
    <section className="relative py-12 sm:py-20 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-400 mb-6 sm:mb-8">Powered By Cutting-Edge Technology</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-2 sm:gap-3 group"
              >
                <tech.icon className={`w-8 h-8 sm:w-12 sm:h-12 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-gray-400 text-xs sm:text-sm font-semibold text-center">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <PerformanceSection />
      <HowItWorksSection />
      <TechStackSection />
      <CTASection />

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

export default LandingPage;