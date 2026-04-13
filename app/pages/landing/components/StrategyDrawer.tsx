"use client";

import React from "react";
import { X, TrendingUp, Calendar, Wallet, Target, ArrowUpRight } from "lucide-react";

interface StrategyData {
  name: string;
  type: string;
  initialInvestment: string;
  startDate: string;
  currentValue: string;
  totalReturn: string;
  returnPercent: string;
  avgMonthlyPercent: string;
  months: number;
  positiveMonths: number;
  successRate: string;
}

interface StrategyDrawerProps {
  parentName: string;
  strategies: StrategyData[];
  isOpen: boolean;
  onClose: () => void;
}

const MiniCard: React.FC<{ data: StrategyData; strategyId: string; index: number }> = ({ data, strategyId, index }) => {
  const stats = [
    { icon: Calendar, label: "Started", value: data.startDate },
    { icon: TrendingUp, label: "Monthly Avg", value: data.avgMonthlyPercent },
    { icon: Target, label: "Success Rate", value: data.successRate },
    { icon: ArrowUpRight, label: "Total Return", value: data.returnPercent },
  ];

  const handleViewDashboard = () => {
    // Map sub-strategy index to dashboard account index (0 is primary, 1+ are sub-accounts)
    const dashboardAccountIndex = index + 1;
    window.location.href = `/dashboard?strategy=${strategyId.toLowerCase()}&account=${dashboardAccountIndex}`;
  };

  return (
    <div className="strategy-outer mx-auto">
      <div className="strategy-dot" />
      <div className="strategy-card-inner">
        <div className="strategy-ray" />

        <div className="relative z-10 w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10  border border-white/20 flex items-center justify-center">
                <span className="text-white font-semibold text-lg tracking-wider">
                  {data.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white tracking-tight">
                  {data.name}
                </h2>
                <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                  Sub‑Strategy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <span className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                {data.type}
              </span>
            </div>
          </div>

          {/* Primary Metric */}
          <div className="mb-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Current Value
            </p>
            <div className="text-4xl font-bold text-white tracking-tight mb-1">
              {data.currentValue}
            </div>
            <div className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-6">
              Initial: {data.initialInvestment}
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-blue-500/20 text-blue-400 text-sm font-bold border border-blue-500/30">
                <ArrowUpRight className="w-4 h-4" />
                {data.returnPercent}
              </div>
              <span className="text-sm text-slate-500 font-medium">
                {data.totalReturn} total
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-3 text-slate-400">
                  <stat.icon className="w-4 h-4" strokeWidth={2.5} />
                  <span className="text-xs font-black uppercase tracking-tight">
                    {stat.label}
                  </span>
                </div>
                <p className="text-lg font-bold text-white leading-tight">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          <button
            onClick={handleViewDashboard}
            className="w-full mt-15 py-4 px-6 cursor-pointer rounded-2xl bg-white text-black text-sm font-black hover:bg-slate-200 transition-all duration-500 flex items-center justify-center gap-2.5 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            VIEW DASHBOARD
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>

        <div className="strategy-line strategy-topl" />
        <div className="strategy-line strategy-leftl" />
      </div>
    </div>
  );
};

const StrategyDrawer: React.FC<StrategyDrawerProps> = ({
  parentName,
  strategies,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/70 "
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="fixed inset-y-0 right-0 z-50 w-full  flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(30,64,175,0.25) 0%, rgba(2,6,23,0.98) 50%)",
          borderLeft: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-8 py-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {parentName} — Variants
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cards */}
        <div className="flex-1  px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {strategies.map((s, i) => (
              <MiniCard key={i} data={s} strategyId={parentName} index={i} />
            ))}
          </div>
        </div>

        {/* Ambient glow at top-right */}
        <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>
    </>
  );
};

export default StrategyDrawer;
