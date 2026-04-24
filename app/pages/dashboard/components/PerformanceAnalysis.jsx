import React from 'react';
import { motion } from 'framer-motion';

const PerformanceAnalysis = ({ data, theme, is800k }) => {
    if (!data) return null;

    const {
        title,
        riskManagement,
        intro,
        benefits,
        performanceBreakdown,
        bottomLine
    } = data;

    // Helper for highlighting text
    const highlightText = (text, regex, color) => {
        return text.split(regex).map((part, i) => {
            if (regex.test(part)) {
                return <span key={i} style={{ color }} className="font-black">{part}</span>;
            }
            return part;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-[32px] p-6 sm:p-10 border border-white/20 bg-[#0a0b14] relative overflow-hidden mt-12 mb-10 shadow-2xl"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none" />

            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12 relative z-10">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                        {title}
                    </h2>
                    <p className="text-white/40 text-xs sm:text-sm font-medium uppercase tracking-widest">
                        Strategy Insight & Risk Assessment
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-white/30 text-[9px] uppercase tracking-[0.25em] font-black mb-1">Average Monthly Gain</span>
                    <span className="text-4xl font-black text-white tabular-nums tracking-tighter" style={{ textShadow: `0 0 20px ${theme.glow}` }}>
                        {riskManagement.avgMonthlyGain}
                    </span>
                </div>
            </div>

            {/* Top Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 relative z-10">
                {/* Risk Management Card */}
                <div className="lg:col-span-2 p-8 rounded-[28px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }} />
                        <h3 className="text-blue-400 font-black text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                            {riskManagement.title}
                        </h3>
                    </div>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed font-medium">
                        {riskManagement.text.split(/(17 of 19 months|89.5% success rate|Oct 2024 \(-1\.2%\)|Mar 2025 \(-2\.7%\))/).map((part, i) => {
                            if (part === "17 of 19 months" || part === "89.5% success rate") return <span key={i} style={{ color: theme.positive }} className="font-bold">{part}</span>;
                            if (part === "Oct 2024 (-1.2%)" || part === "Mar 2025 (-2.7%)") return <span key={i} style={{ color: theme.negative }} className="font-bold">{part}</span>;
                            return part;
                        })}
                    </p>
                </div>

                {/* Performance Breakdown Card */}
                <div className="p-8 rounded-[28px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300">
                    <h3 className="text-white/30 text-[10px] uppercase tracking-[0.25em] font-black mb-6">Annual Breakdown</h3>
                    <div className="space-y-6">
                        {performanceBreakdown.map((item, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-white font-black text-lg tracking-tight">{item.year}</span>
                                <div className="flex items-center gap-2">
                                    <div className="h-[2px] w-4 rounded-full" style={{ background: theme.accent }} />
                                    <span className="text-blue-400/60 text-[10px] font-black uppercase tracking-wider" style={{ color: `${theme.accent}99` }}>{item.stats}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Intro / Mission Text */}
            {!is800k && (
                <div className="mb-10 relative z-10 px-2">
                    <p className="text-white/60 text-sm sm:text-lg leading-relaxed font-medium">
                        {intro.split(/(10-20%|4\.0%)/).map((part, i) => {
                            if (part === "10-20%" || part === "4.0%") {
                                return <span key={i} style={{ color: theme.positive }} className="font-black">{part}</span>;
                            }
                            return part;
                        })}
                    </p>
                </div>
            )}

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 relative z-10">
                {benefits.map((benefit, idx) => (
                    <div
                        key={idx}
                        className="p-6 rounded-[24px] border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 group"
                    >
                        <h4 className="font-black text-[10px] uppercase tracking-[0.15em] mb-3 transition-colors" style={{ color: theme.accent }}>
                            {benefit.title}
                        </h4>
                        <p className="text-white/40 text-[12px] leading-relaxed font-medium">
                            {benefit.text.split(/(3%|5-10%\+|2-5%|23\.3%|10\.2%)/).map((part, i) => {
                                if (["3%", "2-5%", "23.3%", "10.2%"].includes(part)) return <span key={i} style={{ color: theme.positive }} className="font-bold opacity-90">{part}</span>;
                                if (part === "5-10%+") return <span key={i} style={{ color: theme.negative }} className="font-bold opacity-90">{part}</span>;
                                return part;
                            })}
                        </p>
                    </div>
                ))}
            </div>

            {/* Bottom Line / Footer Area */}
            <div 
                className="p-6 sm:p-8 rounded-[28px] border text-left flex items-start gap-5 relative z-10 shadow-xl"
                style={{ background: 'rgba(16, 185, 129, 0.02)', borderColor: 'rgba(16, 185, 129, 0.1)' }}
            >
                <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: theme.positive, boxShadow: `0 0 10px ${theme.positive}` }} />
                <div>
                    <h4 className="font-black text-[10px] uppercase tracking-[0.25em] mb-2" style={{ color: theme.positive }}>
                        {bottomLine.title}
                    </h4>
                    <p className="text-white/70 text-sm sm:text-base leading-relaxed font-medium">
                        {bottomLine.text.split(/(\$50,000|\$103,569|107\.1% return)/).map((part, i) => {
                            if (["$50,000", "$103,569", "107.1% return"].includes(part)) return <span key={i} className="text-white font-black">{part}</span>;
                            return part;
                        })}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default PerformanceAnalysis;
