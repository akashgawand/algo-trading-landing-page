import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ChevronLeft, ChevronRight, Play, Pause, TrendingUp, TrendingDown, Activity, Calendar, ShieldCheck, Target } from 'lucide-react';

const MonthlyWalkthrough = ({ data, theme, is800k }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const timerRef = useRef(null);
    const timelineRef = useRef(null);

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

    const jumpToMonth = (index) => {
        setCurrentIndex(index);
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

    // Auto-scroll timeline
    useEffect(() => {
        if (timelineRef.current) {
            const activeItem = timelineRef.current.children[currentIndex];
            if (activeItem) {
                activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentIndex]);

    const fmt = {
        currency: (v) => {
            const val = Number(v);
            return val < 0 ? `-$${Math.abs(val).toLocaleString()}` : `$${val.toLocaleString()}`;
        },
        pct: (v) => `${v >= 0 ? "+" : ""}${v}%`
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto mt-10 md:mt-20 mb-20 md:mb-32 px-4 sm:px-6">
            {/* Background Decorative Elements - Hidden or scaled on small screens */}
            <div className="absolute -top-24 -right-24 w-64 md:w-96 h-64 md:h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 md:w-96 h-64 md:h-96 bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Main Container */}
            <div className="bg-[#05060b] border border-white/10 rounded-[24px] md:rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">
                
                {/* 1. Header & Strategy Info */}
                <div className="px-6 md:px-12 py-6 md:py-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4 md:gap-5 w-full md:w-auto">
                        <div className="w-10 md:w-12 h-10 md:h-12 rounded-xl md:rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                            <Activity className="w-5 md:w-6 h-5 md:h-6 text-blue-400" />
                        </div>
                        <div>
                            <h2 className="text-lg md:text-2xl font-black text-white tracking-tight">System Walkthrough</h2>
                            <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold">NikolAI Algorithm • Performance Audit</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 md:gap-8 w-full md:w-auto border-t border-white/5 md:border-none pt-4 md:pt-0">
                        <div className="flex flex-col items-start md:items-end">
                            <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-black mb-1">Success Rate</span>
                            <span className="text-lg md:text-xl font-black text-blue-400" style={{ color: theme.accent }}>{summary.successRate}%</span>
                        </div>
                        <div className="w-[1px] h-8 md:h-10 bg-white/10 hidden md:block" />
                        <div className="flex flex-col items-end">
                            <span className="text-white/20 text-[9px] uppercase tracking-[0.3em] font-black mb-1">Growth Tier</span>
                            <span className="text-lg md:text-xl font-black text-white">{is800k ? "800K Tier" : "50K Tier"}</span>
                        </div>
                    </div>
                </div>

                {/* 2. Interactive Timeline Bar */}
                <div className="bg-white/[0.02] border-b border-white/5 px-2 md:px-4 overflow-hidden">
                    <div 
                        ref={timelineRef}
                        className="flex items-center gap-2 py-3 md:py-4 no-scrollbar overflow-x-auto scroll-smooth"
                    >
                        {months.map((m, idx) => (
                            <button
                                key={idx}
                                onClick={() => jumpToMonth(idx)}
                                className={`shrink-0 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl transition-all duration-300 border ${
                                    currentIndex === idx 
                                    ? 'bg-blue-500/10 border-blue-500/40 text-white' 
                                    : 'border-transparent text-white/20 hover:text-white/40'
                                }`}
                            >
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap">{m.month}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. The Main Stage (Split View) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[600px]">
                    
                    {/* Left Panel: The Focus Area */}
                    <div className="lg:col-span-7 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden bg-[#06070c] flex flex-col justify-between">
                        {/* Decorative background accent */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
                        
                        {/* Top Utility Row */}
                        <div className="relative z-20 flex justify-between items-start opacity-60 mb-8 lg:mb-0">
                            <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: theme.accent }}>System Architecture</span>
                                <span className="text-[9px] md:text-[10px] font-bold text-white/70 tracking-wider uppercase">NIKOLAI_CORE_V4.0</span>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1 md:py-1.5 rounded-lg bg-white/5 border border-white/10">
                                <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-white/80">Live Auditing</span>
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="relative z-10 py-8 md:py-12"
                            >
                                <div className="flex items-center gap-3 mb-6 md:mb-10">
                                    <div className="w-1 h-3 md:h-4 rounded-full" style={{ background: theme.accent }} />
                                    <span className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Audit Sequence • {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1}</span>
                                    <div className="h-[1px] flex-1 bg-white/5 ml-2 md:ml-4" />
                                </div>

                                <div className="space-y-1 md:space-y-2 mb-6 md:mb-10 text-left">
                                    <span className="text-white/20 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] block ml-0.5">Reporting Month</span>
                                    <h3 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-tight break-words">
                                        {currentMonth.month}
                                    </h3>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 md:gap-10">
                                    <div className="space-y-3 md:space-y-4 w-full sm:w-auto">
                                        <span className="text-white/20 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black block ml-0.5">Net Performance</span>
                                        <div 
                                            className="inline-flex items-center gap-3 px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl border shadow-2xl transition-all duration-500 w-full sm:w-auto justify-center sm:justify-start"
                                            style={{ 
                                                background: `${currentMonth.returnPercent >= 0 ? theme.positive : theme.negative}08`,
                                                borderColor: `${currentMonth.returnPercent >= 0 ? theme.positive : theme.negative}20`,
                                                color: currentMonth.returnPercent >= 0 ? theme.positive : theme.negative
                                            }}
                                        >
                                            {currentMonth.returnPercent >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                                            <span className="text-xl md:text-3xl font-black tabular-nums tracking-tight">{fmt.pct(currentMonth.returnPercent)}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 md:space-y-4 pb-0.5 w-full sm:w-auto border-t sm:border-none border-white/5 pt-4 sm:pt-0">
                                        <span className="text-white/20 text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black block">Yield Analysis</span>
                                        <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                                            <span className="text-xl md:text-2xl font-black text-white/80 tabular-nums">
                                                {currentMonth.returnPercent >= 0 ? "+" : ""}{fmt.currency(currentMonth.change)}
                                            </span>
                                            <span className="text-[9px] md:text-[10px] font-bold text-white/20 uppercase tracking-widest">USD</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Bottom Signature Row */}
                        <div className="relative z-20 flex justify-between items-end opacity-50 pt-6 md:pt-10 border-t border-white/5 mt-8 lg:mt-0">
                            <div className="flex flex-col gap-1">
                                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: theme.accent }}>Data Integrity Signature</span>
                                <span className="text-[8px] md:text-[9px] font-mono text-white/70">HASH: <span style={{ color: theme.accent }} className="opacity-90">{Math.random().toString(16).slice(2, 10).toUpperCase()}</span></span>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: theme.accent }}>Reporting Cycle</span>
                                <span className="text-[9px] md:text-[10px] font-bold text-white/70">{months.length} Months Consolidated</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Detailed Metrics & Insights */}
                    <div className="lg:col-span-5 p-6 md:p-12 flex flex-col justify-between bg-[#08090f]/50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-8 md:space-y-12"
                            >
                                {/* Portfolio Snapshot */}
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <Calendar className="w-3.5 md:w-4 h-3.5 md:h-4 text-blue-400" />
                                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Strategic Position</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] md:text-[11px] font-bold text-white/20 block">Valuation</span>
                                        <span className="text-3xl md:text-5xl font-black text-white tabular-nums tracking-tighter">
                                            {fmt.currency(currentMonth.portfolioValue)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                                        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5">
                                            <span className="text-[8px] md:text-[9px] font-black text-white/20 uppercase block mb-1">Status</span>
                                            <span className="text-[10px] md:text-xs font-black text-blue-400 uppercase tracking-widest">{currentIndex === 0 ? "Initial" : "Compound"}</span>
                                        </div>
                                        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5">
                                            <span className="text-[8px] md:text-[9px] font-black text-white/20 uppercase block mb-1">Drawdown</span>
                                            <span className="text-[10px] md:text-xs font-black text-emerald-400 uppercase tracking-widest">Low Risk</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Commentary Card */}
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl md:rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
                                    <div className="relative p-5 md:p-8 rounded-2xl md:rounded-3xl bg-[#0a0b14] border border-white/10 shadow-2xl">
                                        <ShieldCheck className="w-5 md:w-6 h-5 md:h-6 text-emerald-400 mb-3 md:mb-4" />
                                        <p className="text-white/70 text-sm md:text-lg leading-relaxed font-medium italic">
                                            "{currentMonth.commentary}"
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Controls Integrated in Panel */}
                        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5">
                            <div className="flex items-center justify-center gap-2 md:gap-3">
                                <button 
                                    onClick={prevMonth}
                                    disabled={currentIndex === 0}
                                    className="w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90 disabled:opacity-0"
                                >
                                    <ChevronLeft className="w-5 md:w-6 h-5 md:h-6" />
                                </button>
                                
                                <button 
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="h-12 md:h-14 flex-1 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center justify-center gap-3 md:gap-4 transition-all active:scale-95 shadow-2xl"
                                    style={{ 
                                        background: isPlaying ? 'rgba(255,255,255,0.05)' : theme.accent,
                                        color: isPlaying ? 'white' : 'black'
                                    }}
                                >
                                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                                    <span className="whitespace-nowrap">{isPlaying ? "Pause Stream" : "Start Walkthrough"}</span>
                                </button>

                                <button 
                                    onClick={nextMonth}
                                    disabled={currentIndex === months.length - 1}
                                    className="w-12 md:w-14 h-12 md:h-14 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90 disabled:opacity-0"
                                >
                                    <ChevronRight className="w-5 md:w-6 h-5 md:h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Executive Data Strip (Footer) */}
                <div className="bg-[#0a0b14] border-t border-white/10 p-6 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="space-y-1 md:space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span className="text-[8px] md:text-[9px] font-black text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em]">Win Rate</span>
                        </div>
                        <span className="text-xl md:text-2xl font-black text-white tabular-nums">{summary.positiveMonths} <span className="text-white/20 text-xs">/ {summary.totalMonths}</span></span>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span className="text-[8px] md:text-[9px] font-black text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em]">Max Risk</span>
                        </div>
                        <span className="text-xl md:text-2xl font-black text-white tabular-nums">{summary.negativeMonths} <span className="text-white/20 text-xs">/ {summary.totalMonths}</span></span>
                    </div>

                    <div className="space-y-1 md:space-y-2">
                        <div className="flex items-center gap-2">
                            <Target className="w-3 md:w-3.5 h-3 md:h-3.5 text-blue-400" />
                            <span className="text-[8px] md:text-[9px] font-black text-white/30 uppercase tracking-[0.2em] md:tracking-[0.3em]">Accuracy</span>
                        </div>
                        <span className="text-xl md:text-2xl font-black text-blue-400 tabular-nums" style={{ color: theme.accent }}>{summary.successRate}%</span>
                    </div>

                    <div className="space-y-1 md:space-y-2 flex flex-col items-end">
                        <button 
                            onClick={restart}
                            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-[8px] md:text-[9px] font-black text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em] hover:text-white hover:bg-white/10 transition-all w-full md:w-auto justify-center"
                        >
                            <RotateCcw className="w-3 h-3" /> Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Verifier */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-12 px-4 md:px-8 text-[8px] font-black text-white/10 uppercase tracking-[0.3em] md:tracking-[0.5em] gap-3">
                <span>Data Integrity: Validated</span>
                <span className="hidden md:block">Algorithm: Nikolai Ver 4.0</span>
                <span>Gemalgo Systems © 2026</span>
            </div>
        </div>
    );
};

export default MonthlyWalkthrough;
