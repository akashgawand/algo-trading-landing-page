"use client";

import React, { useState, useCallback, useMemo, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    AreaChart, Area, BarChart, Bar, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ReferenceLine, Cell
} from "recharts";
import {
    Activity,
    Wallet,
    Target,
    TrendingUp,
    ArrowUpRight,
    Calendar,
    ChevronLeft,
    ChevronRight,
    BarChart3,
    PieChart,
    Settings,
    Maximize2,
    Database,
    LineChart as LineChartIcon
} from "lucide-react";
import { ThemeProvider, useTheme } from "./components/themeProvider";

// ─── Static data imports ─────────────────────────────────────────────────────
import apolloData from "./apolloData/data.json";
import orionData from "./orionData/data.json";
import nikolaiData from "./nikolAiData/data.json";
import Link from "next/link";
import PerformanceAnalysis from "./components/PerformanceAnalysis";
import MonthlyWalkthrough from "./components/MonthlyWalkthrough";

const ALL_STRATEGIES = {
    orion: orionData,
    apollo: apolloData,
    nikolai: nikolaiData,
};

// ─── Formatters ───────────────────────────────────────────────────────────────
const fmt = {
    currency: (v) => v == null ? "—" : `$${Number(v).toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
    pct: (v) => v == null ? "—" : `${v >= 0 ? "+" : ""}${Number(v).toFixed(2)}%`,
    num: (v) => v == null ? "—" : Number(v).toLocaleString("en-US", { maximumFractionDigits: 2 }),
};

// ─── Custom Recharts tooltip ──────────────────────────────────────────────────
const DataTooltip = ({ active, payload, label, theme }) => {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    const isDrawdown = payload[0].dataKey === 'drawdown';
    const isEquity = payload[0].dataKey === 'value';
    const isReturn = payload[0].dataKey === 'returnPercent';

    return (
        <div
            className="bg-[#0e0f1a] rounded-2xl px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10"
            style={{ boxShadow: `0 8px 32px rgba(0,0,0,0.8), 0 0 15px ${theme.glow}` }}
        >
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-black mb-3 border-b border-white/5 pb-2">
                {label || data.month}
            </div>

            <div className="space-y-3">
                {isEquity && (
                    <div className="flex items-center justify-between gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: theme.accent }} />
                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-tight">Portfolio Value</span>
                        </div>
                        <span className="text-sm font-black tabular-nums text-white">
                            {fmt.currency(data.value)}
                        </span>
                    </div>
                )}

                {isDrawdown ? (
                    <div className="flex items-center justify-between gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: theme.negative }} />
                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-tight">Drawdown</span>
                        </div>
                        <span className="text-sm font-black tabular-nums" style={{ color: theme.negative }}>
                            {data.drawdown.toFixed(2)}%
                        </span>
                    </div>
                ) : (
                    <div className="flex items-center justify-between gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ background: data.returnPercent >= 0 ? theme.positive : theme.negative }} />
                            <span className="text-[10px] text-white/50 font-bold uppercase tracking-tight">{isReturn ? 'Return' : 'Monthly Perf'}</span>
                        </div>
                        <span className="text-sm font-black tabular-nums" style={{ color: data.returnPercent >= 0 ? theme.positive : theme.negative }}>
                            {data.returnPercent >= 0 ? "+" : ""}{data.returnPercent.toFixed(2)}%
                        </span>
                    </div>
                )}

                {!isEquity && !isDrawdown && (
                    <div className="flex items-center justify-between gap-10">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span className="text-[10px] text-white/30 font-bold uppercase tracking-tight">Value</span>
                        </div>
                        <span className="text-[11px] font-bold tabular-nums text-white/60">
                            {fmt.currency(data.value)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon, positive, theme }) => {
    const isPositive = positive === undefined ? (typeof value === "string" ? value.includes("+") : value > 0) : positive;
    const valueColor = positive === null ? "text-white/90" : isPositive ? theme.positive : theme.negative;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-1 rounded-[24px] sm:rounded-[28px] px-5 sm:px-7 py-5 sm:py-6 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden transition-all duration-500 cursor-default group"
            style={{
                background: theme.card,
                border: `1px solid ${theme.border}`,
            }}
            whileHover={{
                y: -6,
                borderColor: theme.borderHover || theme.accent,
                boxShadow: `0 20px 40px rgba(0,0,0,0.7), 0 0 25px ${theme.glow}`,
            }}
        >
            <div className="flex items-start justify-between mb-3 sm:mb-4 min-h-[36px] sm:min-h-[44px]">
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.25em] text-white/30 group-hover:text-white/50 transition-colors leading-relaxed pr-4">
                        {label}
                    </span>
                    <div className="h-[2px] w-4 rounded-full transition-all duration-500 group-hover:w-8" style={{ background: theme.accent }} />
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/[0.03] text-white/20 group-hover:bg-white/[0.08] group-hover:text-white/60 transition-all duration-500 border border-white/5 shrink-0 ml-2">
                    {icon}
                </div>
            </div>

            <div className="flex flex-col">
                <span className={`text-xl sm:text-2xl lg:text-3xl text-white font-black tracking-tighter leading-none tabular-nums`} >
                    {value}
                </span>
                {sub && (
                    <div className="flex items-center gap-1.5 mt-3">
                        <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-[6px] bg-white/5 border border-white/5" style={{ color: theme.mutedText }}>
                            {sub}
                        </span>
                    </div>
                )}
            </div>

            {/* Premium Animated Overlays (Non-Blur) */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-1000" style={{ background: theme.accent }} />
        </motion.div>
    );
};

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ title, theme }) => (
    <div className="mb-6">
        <div className="flex items-center gap-3">
            <div className="w-[4px] h-[20px] rounded-full" style={{ background: theme.textGradient }} />
            <h2 className="text-lg font-black tracking-tight m-0 text-white/90">
                {title}
            </h2>
            <div className="flex-1 h-[1px] bg-gradient-to-right from-white/10 to-transparent ml-2" />
        </div>
    </div>
);

// ─── Glassmorphic Card ────────────────────────────────────────────────────────
const GlassCard = ({ children, theme, className = "", style = {} }) => (
    <div
        className={`rounded-[32px] px-8 py-7 shadow-[0_12px_45px_rgba(0,0,0,0.7)] relative overflow-hidden group ${className}`}
        style={{
            background: theme.card.replace('0.9)', '0.96)').replace('0.98)', '1)'),
            border: `1px solid ${theme.border}`,
            ...style,
        }}
    >
        {/* Subtle accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-right from-transparent via-white/[0.08] to-transparent" />
        {children}
    </div>
);

// ─── Main Dashboard Cockpit ───────────────────────────────────────────────────
const DashboardCockpit = () => {
    const { theme, strategy, setStrategy } = useTheme();
    const [accountIndex, setAccountIndex] = useState(0);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Sync state with URL params
    React.useEffect(() => {
        const s = searchParams.get("strategy")?.toLowerCase();
        const a = searchParams.get("account");

        if (s && ALL_STRATEGIES[s]) {
            setStrategy(s);
        }
        if (a !== null && !isNaN(parseInt(a))) {
            setAccountIndex(parseInt(a));
        }
    }, [searchParams, setStrategy]);

    const updateParams = useCallback((newStrategy, newAccount) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newStrategy) params.set("strategy", newStrategy);
        if (newAccount !== undefined) params.set("account", newAccount);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [searchParams, router, pathname]);

    const strategyData = ALL_STRATEGIES[strategy];

    const accounts = useMemo(() => {
        if (!strategyData) return [];
        const pa = strategyData.primaryAccount;
        const subs = strategyData.subAccounts || [];
        return [pa, ...subs];
    }, [strategyData]);

    const activeAccount = accounts[accountIndex] || accounts[0];
    const summary = activeAccount?.summary;
    const metrics = activeAccount?.metrics;

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 12;

    // Reset pagination on strategy/account change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [strategy, accountIndex]);

    const chartData = useMemo(() => {
        if (!activeAccount?.monthlyHistory) return [];
        return [...activeAccount.monthlyHistory].reverse();
    }, [activeAccount]);

    const drawdownData = useMemo(() => {
        if (!chartData.length) return [];
        let peak = chartData[0].value;
        return chartData.map((d) => {
            // If drawdown is explicitly provided in data (like the dummy data we added), use it.
            // Otherwise, calculate it from peak.
            if (d.drawdown !== undefined) return d;

            if (d.value > peak) peak = d.value;
            const dd = peak > 0 ? ((d.value - peak) / peak) * 100 : 0;
            return { ...d, drawdown: parseFloat(dd.toFixed(2)) };
        });
    }, [chartData]);

    const handleStrategyChange = useCallback((s) => {
        setStrategy(s);
        setAccountIndex(0);
        setCurrentPage(1);
        updateParams(s, 0);
    }, [setStrategy, updateParams]);

    const handleAccountChange = useCallback((idx) => {
        setAccountIndex(idx);
        setCurrentPage(1);
        updateParams(strategy, idx);
    }, [strategy, updateParams]);

    const tableData = useMemo(() => {
        const fullList = [...(activeAccount?.monthlyHistory || [])];
        return {
            total: fullList.length,
            paginated: fullList.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
        };
    }, [activeAccount, currentPage]);

    const STRATEGIES = [
        { id: "orion", label: "Orion", type: "Stocks" },
        { id: "apollo", label: "Apollo", type: "Gold" },
        { id: "nikolai", label: "NikolAI", type: "Forex" },
    ];

    const axisStyle = { fill: "rgba(255,255,255,0.35)", fontSize: 10, fontFamily: "Inter, sans-serif" };

    return (
        <div className="min-h-screen font-['Inter'] antialiased">
            {/* ── TOP NAV ───────────────────────────── */}
            <nav className="sticky top-0 z-50 bg-[#05050f]/95 px-3 sm:px-6 md:px-7 flex flex-nowrap items-center justify-between min-h-[50px] h-auto py-1 lg:py-0 shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                style={{ borderBottom: `1px solid ${theme.border}` }}>

                <div className="flex items-center gap-3 sm:gap-4 group">
                    <img
                        src="/gemalgoblue.png"
                        alt="Gemalgo Logo"
                        className="h-10 sm:h-20 w-auto object-contain"
                    />
                </div>

                <div className="flex items-center gap-0.5 p-1 rounded-xl border bg-[#12131a] overflow-x-auto no-scrollbar scroll-smooth" style={{ borderColor: theme.border }}>
                    {STRATEGIES.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => handleStrategyChange(s.id)}
                            className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black cursor-pointer transition-all duration-300 outline-none flex items-center gap-2 relative shrink-0 ${strategy === s.id ? "text-white" : "text-white/20 hover:text-white/60"
                                }`}
                        >
                            {strategy === s.id && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/[0.06] border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                                    style={{ background: theme.card }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-300 relative z-10`}
                                style={{
                                    background: strategy === s.id ? theme.accent : 'currentColor',
                                    boxShadow: strategy === s.id ? `0 0 8px ${theme.accent}` : 'none'
                                }} />
                            <span className="relative z-10 tracking-widest uppercase">{s.label}</span>
                        </button>
                    ))}
                </div>
                {/*                 
                <div className="flex items-center gap-4">
                    <div className="h-8 w-px bg-white/10 hidden sm:block" />
                    <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
                        <Database className="w-3.5 h-3.5" />
                        Export CSV
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2 rounded-xl text-[11px] font-bold text-black transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                            style={{ background: theme.textGradient }}>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        Connect Live
                    </button>
                </div> */}
            </nav>

            <main className="px-4 sm:px-6 md:px-7 py-8 max-w-[1440px] mx-auto">

                {/* ── UNIFIED FILTER BAR ───────────────── */}
                <div className="mb-6 lg:mb-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-5">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] sm:text-[11px] font-black text-white/30 hover:text-white/80 hover:bg-white/[0.08] transition-all duration-300 group shrink-0"
                            style={{ borderColor: theme.border }}
                        >
                            <ChevronLeft className="w-3 h-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
                            <span className="tracking-[0.1em] uppercase">Back</span>
                        </Link>
                        <div className="flex items-center gap-2 bg-white/[0.02] p-1 rounded-2xl border border-white/5 shadow-inner overflow-x-auto no-scrollbar" style={{ borderColor: theme.border }}>
                            <div className="px-2.5 py-1 text-[8px] font-black text-white/10 uppercase tracking-[0.2em] border-r border-white/5 mr-1 shrink-0 hidden xs:block">Tier</div>
                            <div className="flex gap-1 min-w-0">
                                {accounts.map((acct, idx) => {
                                    const label = `$${Number(acct.summary.initialInvestment).toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })}`;
                                    const isActive = idx === accountIndex;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleAccountChange(idx)}
                                            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black cursor-pointer transition-all duration-500 outline-none flex items-center gap-2 relative shrink-0 ${isActive ? "text-white" : "text-white/20 hover:text-white/70"
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="tier-pill"
                                                    className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/10"
                                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                />
                                            )}
                                            <span className="relative z-10">{label}</span>
                                            {idx === 0 && <span className="relative z-10 px-1 py-0.5 rounded-[4px] bg-white/10 text-[7px] uppercase tracking-tighter text-white/40 hidden xs:inline">Pri</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-8 bg-white/[0.02] sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-white/5 sm:border-0" style={{ borderColor: theme.border }}>
                        <div className="flex items-center gap-2.5 sm:border-r sm:pr-8 border-white/5" style={{ borderColor: theme.border }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse hidden xs:block" />
                            <div className="flex flex-col sm:items-end">
                                <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold mb-0.5">Audit Status</span>
                                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Verified & Live</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:items-end">
                            <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold mb-0.5">Audit Period</span>
                            <div className="flex items-center gap-1.5 text-white/60 font-mono text-[10px] sm:text-sm font-semibold">
                                <Calendar className="w-2.5 h-2.5 text-blue-400/50" />
                                {summary?.period}
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${strategy}-${accountIndex}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        {/* ── STAT CARDS ───────────────────────── */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                            <StatCard label="Initial Investment" value={fmt.currency(summary?.initialInvestment)} icon={<Database className="w-3 h-3" />} theme={theme} positive={null} />
                            <StatCard label="Current Equity" value={fmt.currency(summary?.currentValue)} icon={<Activity className="w-3 h-3" />} theme={theme} positive={null} />
                            <StatCard label="Total Net Return" value={fmt.pct(summary?.returnPercent)} icon={<TrendingUp className="w-3 h-3" />} theme={theme} />
                            <StatCard label="Absolute Profit" value={fmt.currency(summary?.totalReturn)} icon={<Wallet className="w-3 h-3" />} theme={theme} />
                            <StatCard label="Max Drawdown" value={`${metrics?.maxDrawdown?.toFixed(2)}%`} icon={<ChevronLeft className="rotate-90 w-3 h-3" />} theme={theme} positive={false} />
                            <StatCard label="Win Probability" value={`${summary?.successRate?.toFixed(1)}%`} icon={<Target className="w-3 h-3" />} sub={`${summary?.positiveMonths} Winners`} theme={theme} positive={true} />
                            <StatCard label="Risk/Reward (Sharpe)" value={fmt.num(metrics?.sharpeRatio)} icon={<Maximize2 className="w-3 h-3" />} theme={theme} positive={null} />
                            <StatCard label="Monthly Average" value={fmt.pct(summary?.avgMonthlyPercent)} icon={<ArrowUpRight className="w-3 h-3" />} theme={theme} positive={true} />
                        </div>

                        {/* ── EQUITY CURVE ─────────────────────── */}
                        <div className="mb-5">
                            <GlassCard theme={theme} className="px-5 sm:px-8 py-5 sm:py-7">
                                <SectionHeader title="Portfolio Equity Curve" theme={theme} />
                                <div className="h-[240px] sm:h-[300px] w-full mt-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id={`equityGrad-${strategy}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor={theme.chartColor} stopOpacity={0.25} />
                                                    <stop offset="100%" stopColor={theme.chartColor} stopOpacity={0.01} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid stroke={theme.gridColor} strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                                            <YAxis
                                                tick={axisStyle} axisLine={false} tickLine={false} width={72}
                                                tickFormatter={(v) => `$${Number(v).toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 })}`}
                                            />
                                            <Tooltip content={<DataTooltip theme={theme} />} />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke={theme.chartColor}
                                                strokeWidth={2.5}
                                                fill={`url(#equityGrad-${strategy})`}
                                                dot={false}
                                                activeDot={{ r: 5, fill: theme.chartColor, stroke: theme.secondary, strokeWidth: 2 }}
                                                style={{ filter: `drop-shadow(0 0 6px ${theme.glow})` }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </GlassCard>
                        </div>

                        {/* ── MONTHLY RETURNS + DRAWDOWN ────────── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                            {/* Monthly Returns Bar Chart */}
                            <GlassCard theme={theme} className="px-5 sm:px-8 py-5 sm:py-7">
                                <SectionHeader title="Monthly Returns" theme={theme} />
                                <div className="h-[200px] sm:h-[240px] w-full mt-2">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="35%">
                                            <CartesianGrid stroke={theme.gridColor} strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                                            <YAxis
                                                tick={axisStyle} axisLine={false} tickLine={false} width={44}
                                                tickFormatter={(v) => `${v}%`}
                                            />
                                            <Tooltip content={<DataTooltip theme={theme} />} />
                                            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
                                            <Bar dataKey="returnPercent" radius={[6, 6, 0, 0]} maxBarSize={30}>
                                                {chartData.map((entry, index) => (
                                                    <Cell
                                                        key={index}
                                                        fill={entry.returnPercent >= 0 ? theme.positive : theme.negative}
                                                        fillOpacity={0.85}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </GlassCard>

                            {/* Drawdown Area Chart */}
                            <GlassCard theme={theme} className="px-5 sm:px-8 py-5 sm:py-7">
                                <SectionHeader title="Drawdown Analysis" theme={theme} />
                                <div className="h-[200px] sm:h-[240px] w-full mt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={drawdownData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id={`ddGrad-${strategy}`} x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor={theme.negative} stopOpacity={0.3} />
                                                    <stop offset="100%" stopColor={theme.negative} stopOpacity={0.01} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid stroke="rgba(255,255,255,0.03)" strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                                            <YAxis
                                                tick={axisStyle} axisLine={false} tickLine={false} width={45}
                                                tickFormatter={(v) => `${v.toFixed(0)}%`}
                                                domain={['dataMin - 1', 0]}
                                            />
                                            <Tooltip content={<DataTooltip theme={theme} />} />
                                            <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
                                            <Area
                                                type="monotone"
                                                dataKey="drawdown"
                                                stroke={theme.negative}
                                                strokeWidth={2.5}
                                                fill={`url(#ddGrad-${strategy})`}
                                                dot={false}
                                                activeDot={{ r: 4, fill: theme.negative, stroke: '#000', strokeWidth: 2 }}
                                                animationDuration={1500}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </GlassCard>
                        </div>
                        {/* ── ORION DETAILED METRICS ─────────────────────── */}
                        {strategy === 'orion' && activeAccount?.yearlyPerformance && (
                            <div className="mt-5 space-y-5">
                                {/* Yearly & Recent Performance Grid */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                    {/* Yearly Performance */}
                                    <GlassCard theme={theme} className="px-4 sm:px-8 py-5 sm:py-7 overflow-x-auto">
                                        <SectionHeader title="Yearly Performance" theme={theme} />
                                        <table className="w-full border-collapse text-[12px] min-w-[400px]">
                                            <thead>
                                                <tr className="border-b border-white/5">
                                                    {["Year", "Return", "Months", "Equity", "Win Rate"].map(h => (
                                                        <th key={h} className="py-3 px-2 text-white/35 font-semibold text-[10px] uppercase tracking-widest text-right first:text-left">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {activeAccount.yearlyPerformance.map((y, i) => (
                                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="py-3 px-2 text-white/70 font-bold">{y.year}</td>
                                                        <td className="py-3 px-2 text-right font-bold" style={{ color: y.returnPercent >= 0 ? theme.positive : theme.negative }}>{y.returnPercent > 0 ? "+" : ""}{y.returnPercent}%</td>
                                                        <td className="py-3 px-2 text-right text-white/50">{y.months}</td>
                                                        <td className="py-3 px-2 text-right text-white/90 tabular-nums">{fmt.currency(y.equity)}</td>
                                                        <td className="py-3 px-2 text-right text-white/70">{y.winRate}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </GlassCard>

                                    {/* Recent Performance */}
                                    <GlassCard theme={theme} className="px-4 sm:px-8 py-5 sm:py-7 overflow-x-auto">
                                        <SectionHeader title="Recent Performance" theme={theme} />
                                        <table className="w-full border-collapse text-[12px] min-w-[400px]">
                                            <thead>
                                                <tr className="border-b border-white/5">
                                                    {["Period", "Return", "Profit", "Win Rate"].map(h => (
                                                        <th key={h} className="py-3 px-2 text-white/35 font-semibold text-[10px] uppercase tracking-widest text-right first:text-left">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {activeAccount.recentPerformance.map((r, i) => (
                                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="py-3 px-2 text-white/70 font-bold">{r.period}</td>
                                                        <td className="py-3 px-2 text-right font-bold" style={{ color: r.returnPercent >= 0 ? theme.positive : theme.negative }}>{r.returnPercent > 0 ? "+" : ""}{r.returnPercent}%</td>
                                                        <td className="py-3 px-2 text-right text-white/90 tabular-nums" style={{ color: r.profit >= 0 ? theme.positive : theme.negative }}>{r.profit > 0 ? "+" : ""}{fmt.currency(r.profit)}</td>
                                                        <td className="py-3 px-2 text-right text-white/70">{r.winRate}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </GlassCard>
                                </div>

                                {/* Trading Statistics & Top Stocks Grid */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                    {/* Statistics & Allocation */}
                                    <div className="space-y-5">
                                        <GlassCard theme={theme} className="px-5 sm:px-8 py-5 sm:py-7">
                                            <SectionHeader title="Trading Statistics" theme={theme} />
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                <div className="flex flex-col"><span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Long Trades</span><span className="text-white font-bold">{activeAccount.tradingStatistics.longTrades}</span></div>
                                                <div className="flex flex-col"><span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Short Trades</span><span className="text-white font-bold">{activeAccount.tradingStatistics.shortTrades}</span></div>
                                                <div className="flex flex-col"><span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Profit Factor</span><span className="text-emerald-400 font-bold">{activeAccount.tradingStatistics.profitFactor}</span></div>
                                                <div className="flex flex-col"><span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Long Win Rate</span><span className="text-white font-bold">{activeAccount.tradingStatistics.longWinRate}%</span></div>
                                                <div className="flex flex-col"><span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Short Win Rate</span><span className="text-white font-bold">{activeAccount.tradingStatistics.shortWinRate}%</span></div>
                                                <div className="flex flex-col"><span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Expectancy</span><span className="text-emerald-400 font-bold">{activeAccount.tradingStatistics.expectancy}%</span></div>
                                            </div>
                                        </GlassCard>

                                        <GlassCard theme={theme} className="px-4 sm:px-8 py-5 sm:py-7 overflow-x-auto">
                                            <SectionHeader title="Sector Allocation" theme={theme} />
                                            <table className="w-full border-collapse text-[12px]">
                                                <tbody>
                                                    {activeAccount.sectorAllocation.map((s, i) => (
                                                        <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                                            <td className="py-2.5 px-2 text-white/80 font-medium">{s.sector}</td>
                                                            <td className="py-2.5 px-2 text-right">
                                                                <div className="flex items-center justify-end gap-3">
                                                                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.allocationPercent}%`, background: theme.accent }} />
                                                                    </div>
                                                                    <span className="text-white/90 font-bold w-10">{s.allocationPercent}%</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-2.5 px-2 text-right text-white/40 text-[10px]">{s.trades} trades</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </GlassCard>
                                    </div>

                                    {/* Top Performing Stocks */}
                                    <GlassCard theme={theme} className="px-4 sm:px-8 py-5 sm:py-7 overflow-x-auto h-full">
                                        <SectionHeader title="Top Performing Stocks" theme={theme} />
                                        <table className="w-full border-collapse text-[12px] min-w-[300px]">
                                            <thead>
                                                <tr className="border-b border-white/5">
                                                    {["Ticker", "Return", "Trades", "Win Rate"].map(h => (
                                                        <th key={h} className="py-3 px-2 text-white/35 font-semibold text-[10px] uppercase tracking-widest text-right first:text-left">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {activeAccount.topPerformingStocks.map((s, i) => (
                                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="py-3 px-2 text-white/90 font-bold tracking-wider">{s.ticker}</td>
                                                        <td className="py-3 px-2 text-right font-bold" style={{ color: theme.positive }}>+{s.returnPercent}%</td>
                                                        <td className="py-3 px-2 text-right text-white/50">{s.trades}</td>
                                                        <td className="py-3 px-2 text-right text-white/70">{s.winRate}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </GlassCard>
                                </div>
                            </div>
                        )}

                        {/* ── APOLLO DETAILED METRICS ─────────────────────── */}
                        {strategy === 'apollo' && activeAccount?.performanceMetrics && (
                            <div className="mt-5 space-y-5">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                                    <GlassCard theme={theme} className="px-5 sm:px-8 py-5 sm:py-7">
                                        <SectionHeader title="Performance Metrics" theme={theme} />
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Win Rate</span>
                                                <span className="text-white font-bold text-lg">{activeAccount.performanceMetrics.winRate}%</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Profit Factor</span>
                                                <span className="text-emerald-400 font-bold text-lg">{activeAccount.performanceMetrics.profitFactor}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Peak Drawdown</span>
                                                <span className="text-rose-400 font-bold text-lg">{activeAccount.performanceMetrics.peakDrawdown}%</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Risk/Reward Ratio</span>
                                                <span className="text-white font-bold text-lg">{activeAccount.performanceMetrics.riskRewardRatio}</span>
                                            </div>
                                        </div>
                                    </GlassCard>

                                    <GlassCard theme={theme} className="px-5 sm:px-8 py-5 sm:py-7">
                                        <SectionHeader title="Trading Statistics" theme={theme} />
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Positive Months</span>
                                                <span className="text-white font-bold text-lg">{activeAccount.tradingStatistics.positiveMonths}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Success Rate</span>
                                                <span className="text-white font-bold text-lg">{activeAccount.tradingStatistics.successRate}%</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Avg Trade Result</span>
                                                <span className="text-emerald-400 font-bold text-lg">{fmt.currency(activeAccount.tradingStatistics.avgTradeResult)}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Total Pips</span>
                                                <span className="text-white font-bold text-lg">{activeAccount.tradingStatistics.totalPips.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </div>
                            </div>
                        )}

                        <GlassCard theme={theme} className="mt-5 px-4 sm:px-8 py-5 sm:py-7">
                            <SectionHeader title="Monthly Performance Breakdown" theme={theme} />
                            <div className="overflow-x-auto min-h-[350px] sm:min-h-[400px]">
                                <table className="w-full border-collapse text-[12px]">
                                    <thead>
                                        <tr className="border-b" style={{ borderBottomColor: theme.border }}>
                                            {["Month", "Return %", "Profit / Loss", "Portfolio Value"].map((h) => (
                                                <th key={h} className={`py-3 px-2 sm:px-3.5 text-white/35 font-semibold text-[9px] sm:text-[10px] uppercase tracking-widest whitespace-nowrap ${h === "Month" ? "text-left" : "text-right"
                                                    }`}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {tableData.paginated.map((row, i) => {
                                            const pos = row.returnPercent >= 0;
                                            return (
                                                <motion.tr
                                                    key={`${row.month}-${i}`}
                                                    initial={{ opacity: 0, x: -4 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.03 }}
                                                    className="transition-colors duration-150 hover:bg-white/[0.025]"
                                                >
                                                    <td className="py-3 px-2 sm:px-3.5 text-white/70 font-medium">{row.month}</td>
                                                    <td className={`py-3 px-2 sm:px-3.5 text-right font-bold tabular-nums`} style={{ color: pos ? theme.positive : theme.negative }}>
                                                        {pos ? "+" : ""}{row.returnPercent.toFixed(2)}%
                                                    </td>
                                                    <td className="py-3 px-2 sm:px-3.5 text-right tabular-nums" style={{ color: pos ? theme.positive : theme.negative }}>
                                                        {pos ? "+" : ""}{fmt.currency(row.profit)}
                                                    </td>
                                                    <td className="py-3 px-2 sm:px-3.5 text-right text-white/65 tabular-nums">
                                                        {fmt.currency(row.value)}
                                                    </td>
                                                </motion.tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            {tableData.total > rowsPerPage && (
                                <div className="mt-6 flex items-center justify-between border-t pt-5" style={{ borderTopColor: theme.border }}>
                                    <span className="text-[9px] sm:text-[11px] text-white/30 font-medium uppercase tracking-wider">
                                        {Math.min(tableData.total, (currentPage - 1) * rowsPerPage + 1)}-{Math.min(tableData.total, currentPage * rowsPerPage)} of {tableData.total}
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                            disabled={currentPage === 1}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                        </button>

                                        {[...Array(Math.ceil(tableData.total / rowsPerPage))].map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${currentPage === i + 1
                                                    ? "bg-white text-black shadow-lg"
                                                    : "border border-white/10 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
                                                    }`}
                                                style={currentPage === i + 1 ? { background: theme.accent } : {}}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => setCurrentPage(p => Math.min(Math.ceil(tableData.total / rowsPerPage), p + 1))}
                                            disabled={currentPage === Math.ceil(tableData.total / rowsPerPage)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </GlassCard>

                        {/* Performance Analysis Section (NikolAi 50k & 800k) */}
                        {strategy === 'nikolai' && (accountIndex === 0 || accountIndex === 1) && (
                            <PerformanceAnalysis 
                                data={accountIndex === 0 ? strategyData?.subAccounts?.[0]?.performanceAnalysis : activeAccount?.performanceAnalysis} 
                                theme={theme} 
                                is800k={accountIndex === 0}
                            />
                        )}
                        {strategy === 'nikolai' && (accountIndex === 0 || accountIndex === 1) && activeAccount?.monthlyWalkthrough && (
                            <MonthlyWalkthrough data={activeAccount.monthlyWalkthrough} theme={theme} />
                        )}

                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

// ─── Export: Wrapped in ThemeProvider & Suspense ─────────────────────────────
export default function Dashboard() {
    return (
        <ThemeProvider initialStrategy="orion">
            <Suspense fallback={
                <div className="min-h-screen bg-[#05050f] flex items-center justify-center">
                    <Activity className="w-12 h-12 text-blue-500 animate-pulse" />
                </div>
            }>
                <DashboardCockpit />
            </Suspense>
        </ThemeProvider>
    );
}
