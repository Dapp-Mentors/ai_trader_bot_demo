import React from 'react';
import { motion } from 'framer-motion';
import { FaCoins, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { MdCopyAll } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Coin, ExecutionLog } from '@/utils/interfaces';

interface CoinDetailsCardProps {
  coin: Coin | null;
  executionLog?: ExecutionLog | null;
}

export const CoinDetailsCard: React.FC<CoinDetailsCardProps> = ({ coin, executionLog }) => {
  const copyAllDetails = () => {
    if (coin) {
      const coinData = {
        ...coin,
        executedAt: executionLog?.last_execution
          ? new Date(executionLog.last_execution).toLocaleString()
          : 'N/A'
      };
      navigator.clipboard.writeText(JSON.stringify(coinData, null, 2));
      toast.success('Coin details copied to clipboard!');
    }
  };

  if (!coin) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 text-gray-400 text-center"
      >
        <FaCoins className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
        <p className="text-lg">Select a coin to view details</p>
      </motion.div>
    );
  }

  const details = [
    { label: 'Rank', value: coin.rank },
    { label: 'Price', value: coin.price },
    { label: 'Market Cap', value: coin.market_cap },
    { label: 'Circulating Supply', value: coin.circulating_supply },
    { label: '24h Volume', value: coin.volume_24h },
    { label: '1h Change', value: coin.percent_1h, isPercent: true },
    { label: '24h Change', value: coin.percent_24h, isPercent: true },
    { label: '7d Change', value: coin.percent_7d, isPercent: true },
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
          scale: [1, 1.1, 1],
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
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-black">
            {coin.symbol.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">{coin.name}</h2>
            <p className="text-sm text-white/80">{coin.symbol}</p>
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

      {/* Details Grid */}
      <div className="relative z-10 space-y-4">
        {details.map((detail, index) => {
          const isNegative = detail.isPercent && detail.value.startsWith('-');
          const isPositive = detail.isPercent && !detail.value.startsWith('-');
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex justify-between items-center p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-300 border border-transparent hover:border-purple-500/30"
            >
              <span className="text-gray-400 font-medium">{detail.label}</span>
              <span className={`font-bold flex items-center gap-2 ${
                isNegative ? 'text-red-400' : isPositive ? 'text-green-400' : 'text-white'
              }`}>
                {detail.isPercent && (
                  isNegative ? <FaArrowDown className="w-4 h-4" /> : <FaArrowUp className="w-4 h-4" />
                )}
                {detail.value}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-6 pt-4 border-t border-purple-500/20 text-xs text-gray-400 text-center">
        Executed at {executionLog?.last_execution ? new Date(executionLog.last_execution).toLocaleString() : 'N/A'}
      </div>
    </motion.div>
  );
};