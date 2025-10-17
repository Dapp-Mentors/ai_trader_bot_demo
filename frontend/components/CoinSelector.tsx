import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCoins, FaCheckCircle } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Coin } from '@/utils/interfaces';

interface CoinSelectorProps {
    coins: Coin[];
    selectedCoin: Coin | null;
    onCoinChange: (coin: Coin | null) => void;
}

export const CoinSelector: React.FC<CoinSelectorProps> = ({ coins, selectedCoin, onCoinChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (coin: Coin) => {
        onCoinChange(coin);
        setIsOpen(false);
    };

    return (
        <motion.div
            layout
            className={`relative mb-6 w-full transition-all duration-300 ${isOpen ? 'mb-72' : 'mb-6'
                }`} // adds spacing when open
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative p-5 rounded-2xl shadow-2xl border border-purple-500/30 
                   bg-gradient-to-br from-slate-800/80 to-slate-900/80 
                   backdrop-blur-xl hover:border-purple-500/60 transition-all duration-500"
            >
                {/* Animated glow */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-2xl blur-xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <FaCoins className="text-purple-400 w-5 h-5" />
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                            Select Coin
                        </h3>
                    </div>

                    {/* Selector button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex justify-between items-center text-white font-bold py-4 px-5 rounded-xl
                       bg-gradient-to-r from-purple-600/30 to-cyan-600/30 border border-purple-500/40
                       hover:border-purple-500/70 transition-all duration-300 cursor-pointer group"
                    >
                        <span className="text-lg">
                            {selectedCoin ? selectedCoin.name : 'Choose a Cryptocurrency'}
                        </span>
                        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <MdKeyboardArrowDown className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
                        </motion.div>
                    </motion.button>

                    {/* Dropdown list */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 mt-2 w-full bg-slate-900/95 backdrop-blur-xl 
                           rounded-2xl shadow-2xl border border-purple-500/30 z-50 max-h-72 overflow-y-auto"
                            >
                                {coins.map((coin, index) => (
                                    <motion.button
                                        key={coin.slug}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        onClick={() => handleSelect(coin)}
                                        className="w-full flex justify-between items-center px-5 py-4 text-white
                               hover:bg-gradient-to-r hover:from-purple-600/40 hover:to-cyan-600/40
                               border-l-4 border-transparent hover:border-purple-500
                               transition-all duration-300 group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 
                                      rounded-full flex items-center justify-center text-sm font-bold">
                                                {coin.symbol.charAt(0)}
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold group-hover:text-purple-300 transition-colors">
                                                    {coin.name}
                                                </p>
                                                <p className="text-xs text-gray-400">{coin.symbol}</p>
                                            </div>
                                        </div>
                                        <FaCheckCircle
                                            className={`w-5 h-5 ${selectedCoin?.slug === coin.slug
                                                    ? 'text-green-400'
                                                    : 'text-transparent'
                                                }`}
                                        />
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};
