'use client';

import { fetch_wallet_addresses, update_wallet_address } from '@/utils/api';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdAccountBalanceWallet, MdClose } from 'react-icons/md';
import { FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface ProfileModalProps {
    onClose: () => void;
    onSubmitAddress: (address: string) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose, onSubmitAddress }) => {
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const defaultCoin = 'usdt';

    const getDefaultAddress = async () => {
        setFetchLoading(true);
        try {
            const data = await fetch_wallet_addresses(defaultCoin);
            if (data.wallet) {
                setAddress(data.wallet);
            }
        } catch (err) {
            console.error('Failed to fetch wallet:', err);
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => {
        getDefaultAddress();
    }, []);

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
        setError('');
    };

    const handleSubmit = async () => {
        if (!address.trim()) {
            setError('Please enter a valid address.');
            return;
        }

        setLoading(true);
        try {
            await update_wallet_address('usdt', address);
            toast.success('USDT address updated successfully!');
            onSubmitAddress(address);
            onClose();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : 'An unknown error occurred';
            toast.error(`Failed to update address: ${errorMessage}`);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
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
                                <h2 className="text-2xl font-black text-white">Update USDT Address</h2>
                                <p className="text-sm text-white/70">Manage your wallet address</p>
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
                    {/* Current Address Section */}
                    <div className="p-4 bg-slate-700/50 rounded-xl border border-purple-500/20">
                        <p className="text-sm text-gray-400 mb-1">Current USDT Address</p>
                        {fetchLoading ? (
                            <p className="text-white/70">Loading...</p>
                        ) : address ? (
                            <p className="text-2xl font-bold text-white break-all">{address}</p>
                        ) : (
                            <p className="text-white/70">No address set</p>
                        )}
                    </div>

                    {/* Address Input */}
                    <div>
                        <label className="block text-gray-300 font-semibold mb-3">New USDT Address</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={address}
                                onChange={handleAddressChange}
                                className="w-full p-4 pr-20 rounded-xl bg-slate-700/50 text-white border border-purple-500/30 focus:border-purple-500/60 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-lg font-semibold"
                                placeholder="Enter new USDT address"
                                disabled={loading || fetchLoading}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">USDT</span>
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
                            onClick={handleSubmit}
                            disabled={loading || fetchLoading}
                            className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full mx-auto"
                                />
                            ) : (
                                'Update Address'
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProfileModal;