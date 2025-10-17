import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAccountBalanceWallet, MdClose } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Coin } from '@/utils/interfaces';

interface DepositModalProps {
    coin: Coin;
    currentBalance: number;
    onClose: () => void;
    onDeposit: (amount: number) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({ coin, currentBalance, onClose, onDeposit }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
        setError('');
    };

    const handleDeposit = async () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success(`Successfully deposited ${numAmount} ${coin.symbol}!`);
            onDeposit(numAmount);
            setAmount('');
            onClose();
            setLoading(false);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden"
            >
                {/* Animated background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                    }}
                />

                {/* Header */}
                <div className="relative z-10 bg-gradient-to-r from-purple-600 to-cyan-600 p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                            >
                                <MdAccountBalanceWallet className="w-6 h-6 text-white" />
                            </motion.div>
                            <div>
                                <h2 className="text-2xl font-black text-white">Deposit {coin.symbol}</h2>
                                <p className="text-sm text-white/70">Add funds to your portfolio</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
                        >
                            <MdClose className="w-6 h-6 text-white" />
                        </motion.button>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 space-y-6">
                    {/* Current Balance */}
                    <div className="p-4 bg-slate-700/50 rounded-xl border border-purple-500/20">
                        <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                        <p className="text-2xl font-bold text-white">{currentBalance.toFixed(2)} {coin.symbol}</p>
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label className="block text-gray-300 font-semibold mb-3">Amount to Deposit</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                className="w-full p-4 pr-20 rounded-xl bg-slate-700/50 text-white border border-purple-500/30 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-lg font-semibold"
                                placeholder="0.00"
                                disabled={loading}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{coin.symbol}</span>
                        </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400"
                            >
                                <FaExclamationTriangle className="w-5 h-5 flex-shrink-0" />
                                <p className="text-sm font-medium">{error}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-6 py-4 bg-slate-700/50 text-white rounded-xl font-bold border border-slate-600/50 hover:bg-slate-700/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            onClick={handleDeposit}
                            disabled={loading}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full mx-auto"
                                />
                            ) : (
                                'Deposit Now'
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};