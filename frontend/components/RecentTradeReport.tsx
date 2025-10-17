import React from 'react';
import { motion } from 'framer-motion';
import { MdCopyAll, MdShowChart } from 'react-icons/md';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ExecutionLog } from '@/utils/interfaces';

interface TradeReportCardProps {
    report: string | null;
    executionLog?: ExecutionLog | null;
}

export const RecentTradeReportCard: React.FC<TradeReportCardProps> = ({ report, executionLog }) => {
    if (!report) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 text-gray-400 text-center"
            >
                <MdShowChart className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
                <p className="text-lg">No trade report available</p>
            </motion.div>
        );
    }

    const lines = report.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 text-gray-400 text-center"
            >
                <MdShowChart className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
                <p className="text-lg">No trade report available</p>
            </motion.div>
        );
    }

    const coinName = lines[0].split('Report for ')[1]?.replace(':', '') || 'Crypto';
    const reportData: { [key: string]: string } = {};
    const tradeDetails: string[] = [];
    let inTradeDetails = false;

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('Trade Details:')) {
            inTradeDetails = true;
            continue;
        }

        if (inTradeDetails) {
            tradeDetails.push(lines[i]);
        } else {
            const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';

            if (!line.includes(':') && nextLine && !nextLine.includes(':') && !nextLine.startsWith('Trade Details:')) {
                reportData[line] = nextLine;
                i++;
            } else if (line.includes(':')) {
                const [key, value] = line.split(':', 2);
                reportData[key.trim()] = value.trim();
            }
        }
    }

    const copyTradeReport = () => {
        const data = {
            report: report,
            executionLog: executionLog
        };
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        toast.success('Trade report copied to clipboard!');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 overflow-hidden w-full"
        >
            {/* Animated background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-2xl"
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
            <div className="relative z-10 flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 mb-6 -mx-6 -mt-6">
                <div className="flex items-center gap-3">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
                    >
                        <MdShowChart className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                        <h2 className="text-2xl font-black text-white">{coinName} Trade Report</h2>
                        <p className="text-sm text-white/70">AI Analysis & Recommendations</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyTradeReport}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    title="Copy trade report"
                >
                    <MdCopyAll className="w-6 h-6 text-white" />
                </motion.button>
            </div>

            {/* Content - Scrollable */}
            <div className="relative z-10 max-h-96 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {Object.entries(reportData).map(([key, value], index) => {
                    if (!value) return null;

                    const isRecommendation = key.toLowerCase().includes('recommendation');
                    const isChange = key.toLowerCase().includes('change');
                    const isNegative = value.startsWith('-');
                    const isBuy = value.toUpperCase() === 'BUY';
                    const isSell = value.toUpperCase() === 'SELL';

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className={`flex justify-between items-center p-4 rounded-xl transition-all duration-300 ${isRecommendation && isBuy
                                    ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/40'
                                    : isRecommendation && isSell
                                        ? 'bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/40'
                                        : 'bg-slate-800/50 border border-transparent hover:border-purple-500/30'
                                }`}
                        >
                            <span className="text-gray-400 font-medium">{key}</span>
                            <span className={`font-bold flex items-center gap-2 ${isRecommendation
                                    ? isBuy
                                        ? 'text-green-400'
                                        : isSell
                                            ? 'text-red-400'
                                            : 'text-white'
                                    : isChange
                                        ? isNegative
                                            ? 'text-red-400'
                                            : 'text-green-400'
                                        : 'text-white'
                                }`}>
                                {(isRecommendation || isChange) && (
                                    (isBuy || (!isNegative && isChange)) ? (
                                        <FaArrowUp className="w-4 h-4" />
                                    ) : (isSell || (isNegative && isChange)) ? (
                                        <FaArrowDown className="w-4 h-4" />
                                    ) : null
                                )}
                                {value}
                            </span>
                        </motion.div>
                    );
                })}

                {/* Trade Details Section */}
                {tradeDetails.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-6 p-5 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-xl border border-purple-500/30"
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full" />
                            Trade Details
                        </h3>
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-mono">
                            {tradeDetails.join('\n')}
                        </pre>
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-6 pt-4 border-t border-purple-500/20 text-xs text-gray-400">
                {executionLog?.next_execution ? (
                    <span className="flex items-center gap-2">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                        />
                        Next Execution: {new Date(executionLog.next_execution).toLocaleString()}
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-purple-400 rounded-full"
                        />
                        Last Executed: {executionLog?.last_execution ? new Date(executionLog.last_execution).toLocaleString() : 'N/A'}
                    </span>
                )}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-4 right-6 text-gray-400 text-xs font-semibold flex items-center gap-1"
            >
                <FaArrowDown className="w-3 h-3" />
                Scroll
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
          background: linear-gradient(180deg, #6366F1, #8B5CF6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #818CF8, #A78BFA);
        }
      `}</style>
        </motion.div>
    );
};