import React from 'react';
import { motion } from 'framer-motion';
import { MdAccountBalanceWallet, MdCopyAll } from 'react-icons/md';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { InvestmentData } from '@/utils/interfaces';

interface InvestmentCardProps {
    data: InvestmentData;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({ data }) => {
    const { user_investment, coin_performance } = data;

    const formatCurrency = (value: number | undefined | null) => {
        if (value === undefined || value === null || isNaN(value)) return '0.00';
        return value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const formatPercentage = (value: number) => value.toFixed(2);

    const copyAllDetails = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        toast.success('Investment data copied to clipboard!');
    };

    const investmentItems = [
        { label: 'Original Investment', value: formatCurrency(user_investment.original_investment), prefix: '$' },
        { label: 'Total Deposits', value: formatCurrency(user_investment.total_deposits), prefix: '$' },
        { label: 'Total Withdrawals', value: formatCurrency(user_investment.total_withdrawals), prefix: '$' },
        { label: 'Net Investment', value: formatCurrency(user_investment.net_investment), prefix: '$', highlight: true },
        { label: 'Current Share Value', value: formatCurrency(user_investment.current_share_value), prefix: '$' },
        { label: 'Ownership Percentage', value: formatPercentage(user_investment.ownership_percentage), suffix: '%' },
        { label: 'Realized Gains', value: formatCurrency(user_investment.realized_gains), prefix: '$' },
        { label: 'Unrealized Gains', value: formatCurrency(user_investment.unrealized_gains), prefix: '$' },
        { label: 'Total Gains', value: formatCurrency(user_investment.total_gains), prefix: '$' },
        {
            label: 'Overall Profit/Loss',
            value: formatCurrency(Math.abs(user_investment.overall_profit_loss)),
            prefix: '$',
            isProfit: user_investment.overall_profit_loss >= 0
        },
        {
            label: 'Performance',
            value: formatPercentage(user_investment.performance_percentage),
            suffix: '%',
            isProfit: user_investment.performance_percentage >= 0
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 overflow-hidden"
        >
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-2xl blur-2xl"
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl p-5 mb-6 -mx-6 -mt-6">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                    >
                        <MdAccountBalanceWallet className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                        <h2 className="text-2xl font-black text-white">Your Investment</h2>
                        <p className="text-sm text-white/70">Portfolio Overview</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyAllDetails}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    title="Copy all details"
                >
                    <MdCopyAll className="w-6 h-6 text-white" />
                </motion.button>
            </div>

            {/* Content - Scrollable */}
            <div className="relative z-10 max-h-[500px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {investmentItems.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 ${item.highlight
                                ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/40'
                                : 'bg-slate-800/50 border border-transparent hover:border-purple-500/30'
                            }`}
                    >
                        <span className="text-gray-400 font-medium">{item.label}</span>
                        <span className={`font-bold flex items-center gap-2 ${item.isProfit !== undefined
                                ? item.isProfit ? 'text-green-400' : 'text-red-400'
                                : 'text-white'
                            }`}>
                            {item.isProfit !== undefined && (
                                item.isProfit ? <FaArrowUp className="w-4 h-4" /> : <FaArrowDown className="w-4 h-4" />
                            )}
                            {item.prefix}{item.value}{item.suffix}
                        </span>
                    </motion.div>
                ))}

                {/* Portfolio Breakdown Section */}
                {user_investment.portfolio_breakdown && (
                    <>
                        <div className="pt-4 pb-2">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full" />
                                Portfolio Breakdown
                            </h3>
                        </div>
                        {[
                            { label: 'Cash Portion', value: formatCurrency(user_investment.portfolio_breakdown.cash_portion), prefix: '$' },
                            { label: 'Position Portion', value: formatCurrency(user_investment.portfolio_breakdown.position_portion), prefix: '$' },
                            { label: 'Total Portfolio Value', value: formatCurrency(user_investment.portfolio_breakdown.total_value), prefix: '$', highlight: true },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 ${item.highlight
                                        ? 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/40'
                                        : 'bg-slate-800/50 border border-transparent hover:border-cyan-500/30'
                                    }`}
                            >
                                <span className="text-gray-400 font-medium">{item.label}</span>
                                <span className="font-bold text-white">{item.prefix}{item.value}</span>
                            </motion.div>
                        ))}
                    </>
                )}

                {/* Global Coin Performance */}
                {coin_performance && (
                    <>
                        <div className="pt-4 pb-2">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-purple-500 rounded-full" />
                                Global Coin Performance
                            </h3>
                        </div>
                        {[
                            { label: 'Current Price', value: typeof coin_performance.current_price === 'number' ? formatCurrency(coin_performance.current_price) : coin_performance.current_price, prefix: '$' },
                            { label: '24h Price Change', value: typeof coin_performance.price_change_24h === 'number' ? `${formatPercentage(coin_performance.price_change_24h)}%` : coin_performance.price_change_24h, isProfit: typeof coin_performance.price_change_24h === 'number' && coin_performance.price_change_24h >= 0 },
                            { label: 'Total Portfolio Value', value: formatCurrency(coin_performance.total_portfolio_value), prefix: '$' },
                            { label: 'Position Value', value: formatCurrency(coin_performance.position_value), prefix: '$' },
                            { label: 'Overall Performance', value: formatPercentage(coin_performance.overall_performance), suffix: '%', isProfit: coin_performance.overall_performance >= 0 },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                className="flex justify-between items-center p-4 rounded-xl bg-slate-800/50 border border-transparent hover:border-cyan-500/30 transition-all duration-300"
                            >
                                <span className="text-gray-400 font-medium">{item.label}</span>
                                <span className={`font-bold flex items-center gap-2 ${item.isProfit !== undefined
                                        ? item.isProfit ? 'text-green-400' : 'text-red-400'
                                        : 'text-white'
                                    }`}>
                                    {item.isProfit !== undefined && (
                                        item.isProfit ? <FaArrowUp className="w-4 h-4" /> : <FaArrowDown className="w-4 h-4" />
                                    )}
                                    {item.prefix}{item.value}{item.suffix}
                                </span>
                            </motion.div>
                        ))}
                    </>
                )}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-xs font-semibold flex items-center gap-1"
            >
                <FaArrowDown className="w-3 h-3" />
                Scroll for more
            </motion.div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(71, 85, 105, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #9333EA, #06B6D4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #A855F7, #0EA5E9);
        }
      `}</style>
        </motion.div>
    );
};