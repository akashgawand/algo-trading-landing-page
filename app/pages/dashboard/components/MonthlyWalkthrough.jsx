import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

const MonthlyWalkthrough = ({ data, theme }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef(null);

    if (!data || !data.months) return null;

    const { summary, months } = data;
    const currentMonth = months[currentIndex];

    const nextMonth = () => {
        setCurrentIndex((prev) => (prev + 1) % months.length);
    };

    const prevMonth = () => {
        setCurrentIndex((prev) => (prev - 1 + months.length) % months.length);
    };

    const restart = () => {
        setCurrentIndex(0);
        setIsPlaying(false);
    };

    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(nextMonth, 4000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isPlaying, months.length]);

    // Formatters
    const fmt = {
        currency: (v) => {
            const val = Number(v);
            return val < 0 ? `-$${Math.abs(val).toLocaleString()}` : `$${val.toLocaleString()}`;
        },
        pct: (v) => `${v >= 0 ? "+" : ""}${v}%`
    };

    return (
        <div className="rounded-[32px] p-6 sm:p-10 border border-white/20 bg-[#0a0b14] relative overflow-hidden mt-10 mb-20 shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] pointer-events-none" />

            {/* Header */}
            <div className="mb-6 relative z-10">
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">Month-by-Month Presentation</h2>
                <p className="text-white/40 text-xs sm:text-sm font-medium">Interactive walkthrough of the Nikolai Algorithm's performance</p>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-8 relative z-10">
                <div className="h-[1px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        className="absolute top-0 left-0 h-[5px] shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / months.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        style={{ background: theme.accent }}
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">{months[0].month}</span>
                    <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Month {currentIndex + 1} of {summary.totalMonths}</span>
                    <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.2em]">Nov 2025</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="min-h-[400px] sm:min-h-[450px] flex flex-col items-center justify-center py-6 sm:py-10 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.02, y: -10 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="w-full text-center"
                    >
                        <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 tracking-tighter">{currentMonth.month}</h3>
                        <div 
                            className="inline-flex items-center px-6 py-2 rounded-full border font-black text-lg sm:text-xl mb-12 shadow-lg"
                            style={{ 
                                background: `${currentMonth.returnPercent >= 0 ? theme.positive : theme.negative}15`, 
                                borderColor: `${currentMonth.returnPercent >= 0 ? theme.positive : theme.negative}30`,
                                color: currentMonth.returnPercent >= 0 ? theme.positive : theme.negative 
                            }}
                        >
                            {fmt.pct(currentMonth.returnPercent)}
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
                            <div className="p-8 rounded-[28px] border border-white/5 bg-white/[0.03] text-left hover:bg-white/[0.05] transition-all duration-300">
                                <span className="text-white/50 text-[10px] uppercase tracking-[0.25em] font-black mb-4 block">Portfolio Value</span>
                                <span className="text-3xl sm:text-4xl font-black text-white block mb-2 tabular-nums">{fmt.currency(currentMonth.portfolioValue)}</span>
                                <span className="text-blue-400/60 text-[10px] sm:text-xs font-black uppercase tracking-widest" style={{ color: theme.accent }}>
                                    {currentIndex === 0 ? "Starting value" : "Accumulated equity"}
                                </span>
                            </div>
                            <div className="p-8 rounded-[28px] border border-white/5 bg-white/[0.03] text-left hover:bg-white/[0.05] transition-all duration-300">
                                <span className="text-white/50 text-[10px] uppercase tracking-[0.25em] font-black mb-4 block">This Month's Change</span>
                                <span className="text-3xl sm:text-4xl font-black block mb-2 tabular-nums" style={{ color: currentMonth.returnPercent >= 0 ? theme.positive : theme.negative }}>
                                    {currentMonth.returnPercent >= 0 ? "+" : ""}{fmt.currency(currentMonth.change)}
                                </span>
                                <span className="text-white/30 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                                    {currentMonth.returnPercent >= 0 ? "Added to portfolio" : "Portfolio drawdown"}
                                </span>
                            </div>
                        </div>

                        {/* Commentary */}
                        <div 
                            className="max-w-4xl mx-auto p-6 sm:p-8 rounded-[32px] border text-left flex items-start gap-5 shadow-xl"
                            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)' }}
                        >
                            <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 animate-pulse" style={{ background: theme.accent, boxShadow: `0 0 10px ${theme.accent}` }} />
                            <p className="text-white/70 text-sm sm:text-base leading-relaxed font-medium">{currentMonth.commentary}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-12 relative z-10">
                <button 
                    onClick={restart}
                    disabled={currentIndex === 0}
                    className="cursor-pointer p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/40 text-white/70 hover:text-white hover:bg-white/10 transition-all active:scale-95 group disabled:opacity-20 disabled:cursor-not-allowed disabled:active:scale-100"
                    title="Restart"
                >
                    <RotateCcw className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform" />
                </button>
                <button 
                    onClick={prevMonth}
                    disabled={currentIndex === 0}
                    className="flex cursor-pointer items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl bg-white/5 border border-white/40 text-white/70 hover:text-white hover:bg-white/10 transition-all font-black text-[11px] sm:text-xs uppercase tracking-widest active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                
                {currentIndex === months.length - 1 ? (
                    <button 
                        onClick={restart}
                        className="cursor-pointer flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-black text-[11px] sm:text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 hover:brightness-110"
                        style={{ background: theme.accent, color: 'black' }}
                    >
                        <RotateCcw className="w-4 h-4" />
                        Restart
                    </button>
                ) : (
                    <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="cursor-pointer flex items-center gap-3 px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-black text-[11px] sm:text-xs uppercase tracking-[0.2em] transition-all shadow-xl active:scale-95 hover:brightness-110"
                        style={{ background: isPlaying ? 'rgba(255,255,255,0.1)' : theme.accent, color: isPlaying ? 'white' : 'black' }}
                    >
                        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        {isPlaying ? "Pause" : "Play"}
                    </button>
                )}

                <button 
                    onClick={nextMonth}
                    disabled={currentIndex === months.length - 1}
                    className="cursor-pointer flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl bg-white border border-white text-black hover:bg-white/90 transition-all font-black text-[11px] sm:text-xs uppercase tracking-widest active:scale-95 shadow-xl disabled:opacity-20 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    Next <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/5 max-w-4xl mx-auto relative z-10">
                <div className="text-center">
                    <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] font-black block mb-3">Positive Months</span>
                    <span className="text-emerald-400 font-black text-2xl tracking-tighter">{summary.positiveMonths} / {summary.totalMonths}</span>
                </div>
                <div className="text-center">
                    <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] font-black block mb-3">Negative Months</span>
                    <span className="text-rose-400 font-black text-2xl tracking-tighter">{summary.negativeMonths} / {summary.totalMonths}</span>
                </div>
                <div className="text-center">
                    <span className="text-white/50 text-[9px] uppercase tracking-[0.3em] font-black block mb-3">Success Rate</span>
                    <span className="text-blue-400 font-black text-2xl tracking-tighter" style={{ color: theme.accent }}>{summary.successRate}%</span>
                </div>
            </div>

            {/* Final Footer */}
            <div className="text-center mt-12 text-[9px] font-black text-white/50 uppercase tracking-[0.4em] relative z-10">
                Powered by Nikolai Algorithm • gemalgo.com • {summary.positiveMonths}/{summary.totalMonths} positive months • $50,000 → {fmt.currency(summary.finalValue)}
            </div>
        </div>
    );
};

export default MonthlyWalkthrough;
