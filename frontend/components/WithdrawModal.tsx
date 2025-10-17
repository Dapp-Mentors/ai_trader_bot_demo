import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAccountBalanceWallet, MdClose } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Coin } from '@/utils/interfaces';

interface WithdrawModalProps {
    coin: Coin;
    currentBalance: number;
    onClose: () => void;
    onWithdraw: (amount: number) => void;
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ coin, currentBalance, onClose, onWithdraw }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value);
        setError('');
    };

    const setMaxAmount = () => {
        setAmount(currentBalance.toString());
        setError('');
    };

    const handleWithdraw = async () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }
        if (numAmount > currentBalance) {
            setError('Insufficient balance.');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success(`Successfully withdrawn ${numAmount} ${coin.symbol}!`);
            onWithdraw(numAmount);
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
                className="relative w-full max-w-md bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-indigo-500/30 overflow-hidden"
            >
                {/* Animated background */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                    }}
                />

                {/* Header */}
                <div className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                            >
                                <MdAccountBalanceWallet className="w-6 h-6 text-white" />
                            </motion.div>
                            <div>
                                <h2 className="text-2xl font-black text-white">Withdraw {coin.symbol}</h2>
                                <p className="text-sm text-white/70">Remove funds from portfolio</p>
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
                    <div className="p-4 bg-slate-700/50 rounded-xl border border-indigo-500/20">
                        <p className="text-sm text-gray-400 mb-1">Available Balance</p>
                        <p className="text-2xl font-bold text-white">{currentBalance.toFixed(2)} {coin.symbol}</p>
                    </div>

                    {/* Amount Input */}
                    <div>
                        <label className="block text-gray-300 font-semibold mb-3">Amount to Withdraw</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                className="w-full p-4 pr-32 rounded-xl bg-slate-700/50 text-white border border-indigo-500/30 focus:border-indigo-500/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all text-lg font-semibold"
                                placeholder="0.00"
                                disabled={loading}
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={setMaxAmount}
                                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-500 transition-all"
                                    disabled={loading}
                                >
                                    MAX
                                </motion.button>
                                <span className="text-gray-400 font-bold">{coin.symbol}</span>
                            </div>
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
                            onClick={handleWithdraw}
                            disabled={loading}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-indigo-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full mx-auto"
                                />
                            ) : (
                                'Withdraw Now'
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};