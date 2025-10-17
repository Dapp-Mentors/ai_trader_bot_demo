import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MdCopyAll, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import { FaArrowUp, FaArrowDown, FaChartLine } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Coin, ExecutionLog, PortfolioData } from '@/utils/interfaces';

interface ProfitTrendChartProps {
    data: PortfolioData[];
    coin: Coin | null;
    executionLog?: ExecutionLog | null;
}

interface ChartDataPoint {
    time: string;
    fullTime: string;
    totalGains: number;
    performancePercentage: number;
    portfolioValue: number;
    price: number;
}

interface Metric {
    label: string;
    value: string;
    isProfit?: boolean;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: ChartDataPoint }[];
}

export const ProfitTrendChart: React.FC<ProfitTrendChartProps> = ({ data, coin, executionLog }) => {
    if (!data || data.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 text-gray-400 text-center"
            >
                <FaChartLine className="w-16 h-16 mx-auto mb-4 text-purple-400/50" />
                <p className="text-lg">No P&L data available</p>
            </motion.div>
        );
    }

    const latestData = data[data.length - 1];
    const { global } = latestData;

    const chartData: ChartDataPoint[] = data.map(item => ({
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fullTime: new Date(item.timestamp).toLocaleString(),
        totalGains: isFinite(item.global?.total_gains) ? item.global.total_gains : 0,
        performancePercentage: isFinite(item.global?.performance_percentage) ? (item.global.performance_percentage * 100) : 0,
        portfolioValue: isFinite(item.global?.total_portfolio_value) ? item.global.total_portfolio_value : 0,
        price: isFinite(item.price) ? item.price : 0
    }));

    const isPositive = isFinite(global?.total_gains) && global.total_gains >= 0;
    const TrendIcon = isPositive ? MdTrendingUp : MdTrendingDown;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const formatPercentage = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(4)}%`;

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
        if (active && payload && payload.length) {
            // Safely extract your custom data type
            const data = payload[0].payload as ChartDataPoint;
            return (
                <div className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/30 rounded-xl p-4 shadow-2xl">
                    <p className="text-white text-sm font-bold mb-2">{data.fullTime}</p>
                    <div className="space-y-1">
                        <p className="text-gray-300 text-sm flex items-center gap-2">
                            P&L:{' '}
                            <span
                                className={
                                    data.totalGains >= 0
                                        ? 'text-green-400 font-bold'
                                        : 'text-red-400 font-bold'
                                }
                            >
                                {formatCurrency(data.totalGains)}
                            </span>
                        </p>
                        <p className="text-gray-300 text-sm flex items-center gap-2">
                            Performance:{' '}
                            <span
                                className={
                                    data.performancePercentage >= 0
                                        ? 'text-green-400 font-bold'
                                        : 'text-red-400 font-bold'
                                }
                            >
                                {formatPercentage(data.performancePercentage)}
                            </span>
                        </p>
                        <p className="text-gray-300 text-sm">
                            Portfolio:{' '}
                            <span className="text-white font-bold">
                                {formatCurrency(data.portfolioValue)}
                            </span>
                        </p>
                        <p className="text-gray-300 text-sm">
                            {coin?.symbol} Price:{' '}
                            <span className="text-cyan-400 font-bold">
                                {formatCurrency(data.price)}
                            </span>
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    };


    const copyPnLData = () => {
        const summaryData = {
            currentMetrics: {
                totalGains: isFinite(global?.total_gains) ? global.total_gains : 0,
                performancePercentage: isFinite(global?.performance_percentage) ? global.performance_percentage : 0,
                portfolioValue: isFinite(global?.total_portfolio_value) ? global.total_portfolio_value : 0,
            },
            historicalData: data,
            generatedAt: new Date().toISOString()
        };
        navigator.clipboard.writeText(JSON.stringify(summaryData, null, 2));
        toast.success('P&L data copied to clipboard!');
    };

    const metrics: Metric[] = [
        { label: 'Total P&L', value: formatCurrency(isFinite(global?.total_gains) ? global.total_gains : 0), isProfit: isPositive },
        { label: 'Performance', value: formatPercentage(isFinite(global?.performance_percentage) ? global.performance_percentage * 100 : 0), isProfit: isPositive },
        { label: 'Portfolio Value', value: formatCurrency(isFinite(global?.total_portfolio_value) ? global.total_portfolio_value : 0) },
        { label: 'Position Value', value: formatCurrency(isFinite(global?.position_value) ? global.position_value : 0) },
        { label: 'Available Capital', value: formatCurrency(isFinite(global?.current_capital) ? global.current_capital : 0) },
        { label: 'Total Invested', value: formatCurrency(isFinite(global?.total_net_investments) ? global.total_net_investments : 0) },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500 overflow-hidden w-full"
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
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
                            }`}
                    >
                        <TrendIcon className={`w-6 h-6 ${isPositive ? 'text-green-400' : 'text-red-400'}`} />
                    </motion.div>
                    <div>
                        <h2 className="text-2xl font-black text-white">{coin?.name} P&L Trend</h2>
                        <p className="text-sm text-white/70">Performance Analytics</p>
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={copyPnLData}
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                    title="Copy P&L data"
                >
                    <MdCopyAll className="w-6 h-6 text-white" />
                </motion.button>
            </div>

            {/* Metrics Grid */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {metrics.map((metric, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-4 rounded-xl bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                    >
                        <p className="text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">{metric.label}</p>
                        <p className={`text-lg font-bold flex items-center gap-2 ${metric.isProfit !== undefined
                            ? metric.isProfit ? 'text-green-400' : 'text-red-400'
                            : 'text-white'
                            }`}>
                            {metric.isProfit !== undefined && (
                                metric.isProfit ? <FaArrowUp className="w-4 h-4" /> : <FaArrowDown className="w-4 h-4" />
                            )}
                            {metric.value}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Chart */}
            <div className="relative z-10 h-80 mb-6 bg-slate-800/30 rounded-xl p-4 border border-purple-500/20">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <defs>
                            <linearGradient id="colorGains" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={isPositive ? "#10B981" : "#EF4444"} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                        <XAxis
                            dataKey="time"
                            stroke="#9CA3AF"
                            fontSize={12}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            fontSize={12}
                            tickFormatter={(value) => `$${value.toFixed(0)}`}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Line
                            type="monotone"
                            dataKey="totalGains"
                            stroke={isPositive ? "#10B981" : "#EF4444"}
                            strokeWidth={3}
                            dot={{ r: 5, fill: isPositive ? "#10B981" : "#EF4444", strokeWidth: 2, stroke: "#1F2937" }}
                            activeDot={{ r: 7, fill: isPositive ? "#10B981" : "#EF4444", strokeWidth: 2, stroke: "#1F2937" }}
                            fillOpacity={1}
                            fill="url(#colorGains)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex justify-between items-center text-xs pt-4 border-t border-purple-500/20">
                <span className="text-gray-400">
                    Last Updated: {executionLog?.last_execution ? new Date(executionLog.last_execution).toLocaleString() : 'N/A'}
                </span>
                <span className="text-cyan-400 font-bold">
                    {coin?.symbol}: {formatCurrency(isFinite(latestData.price) ? latestData.price : 0)}
                </span>
            </div>
        </motion.div>
    );
};