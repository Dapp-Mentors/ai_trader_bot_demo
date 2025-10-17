import React from 'react';
import { motion } from 'framer-motion';
import { MdAccountBalanceWallet, MdShowChart } from 'react-icons/md';
import { useGlobalContext } from '@/contexts/GlobalContext';

interface ActionButtonsProps {
    isCoinSelected: boolean;
    dropdownOpen?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
    isCoinSelected,
    dropdownOpen = false,
}) => {
    const { setIsDepositOpen, setIsWithdrawOpen } = useGlobalContext();

    const handleDeposit = () => isCoinSelected && setIsDepositOpen?.(true);
    const handleWithdraw = () => isCoinSelected && setIsWithdrawOpen?.(true);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex flex-col gap-4 w-full ${dropdownOpen ? 'mt-6' : 'mt-6'} z-0`}
        >
            {/* Deposit */}
            <motion.button
                whileHover={{ scale: isCoinSelected ? 1.05 : 1 }}
                whileTap={{ scale: isCoinSelected ? 0.95 : 1 }}
                onClick={handleDeposit}
                disabled={!isCoinSelected}
                className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg overflow-hidden 
                   transition-all duration-300 border ${isCoinSelected
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-xl hover:shadow-purple-500/30 border-purple-500/50'
                        : 'bg-slate-700/50 text-gray-500 border-slate-600/50 cursor-not-allowed'
                    }`}
            >
                <span className="relative z-10 flex items-center justify-center gap-3">
                    <MdAccountBalanceWallet className="w-6 h-6" />
                    Deposit Funds
                </span>
            </motion.button>

            {/* Withdraw */}
            <motion.button
                whileHover={{ scale: isCoinSelected ? 1.05 : 1 }}
                whileTap={{ scale: isCoinSelected ? 0.95 : 1 }}
                onClick={handleWithdraw}
                disabled={!isCoinSelected}
                className={`relative w-full py-4 px-6 rounded-xl font-bold text-lg overflow-hidden 
                   transition-all duration-300 border ${isCoinSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl hover:shadow-indigo-500/30 border-indigo-500/50'
                        : 'bg-slate-700/50 text-gray-500 border-slate-600/50 cursor-not-allowed'
                    }`}
            >
                <span className="relative z-10 flex items-center justify-center gap-3">
                    <MdShowChart className="w-6 h-6" />
                    Withdraw Funds
                </span>
            </motion.button>
        </motion.div>
    );
};
