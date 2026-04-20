"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Calendar,
  Wallet,
  Target,
  ArrowUpRight,
} from "lucide-react";
import strategiesJson from "./strategydata.json";
import StrategyDrawer from "./StrategyDrawer";

interface SubStrategyData {
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

interface StrategyData extends SubStrategyData {
  subStrategies: SubStrategyData[];
}

const StrategyCard: React.FC<{ data: StrategyData }> = ({ data }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const stats = [
    { icon: Calendar, label: "Started", value: data.startDate },
    { icon: TrendingUp, label: "Monthly Avg", value: data.avgMonthlyPercent },
    { icon: Target, label: "Success Rate", value: data.successRate },
    { icon: ArrowUpRight, label: "Total Return", value: data.returnPercent },
  ];

  return (
    <>
      <div className="strategy-outer mx-auto">
        {/* The Animated Dot */}
        <div className="strategy-dot" />

        <div className="strategy-card-inner">
          {/* The Visual Ray Effect */}
          <div className="strategy-ray" />

          {/* Header */}
          <div className="relative z-10 w-full h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 md:mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg tracking-wider">
                    {data.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white tracking-tight">
                    {data.name}
                  </h2>
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                    Strategy
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
            <div className="mb-6 md:mb-10">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Current Value
              </p>
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
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
            <div className="grid grid-cols-2 gap-y-6 md:gap-y-8 gap-x-4 mb-6 md:mb-10">
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

            {/* Action Button */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="w-full mt-8 md:mt-auto  py-3.5 md:py-4 px-6 cursor-pointer rounded-2xl bg-white text-black text-sm font-black hover:bg-slate-200 transition-all duration-500 flex items-center justify-center gap-2.5 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              VIEW MORE
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
            </button>
          </div>

          {/* Decorative Internal Lines */}
          <div className="strategy-line strategy-topl" />
          <div className="strategy-line strategy-leftl" />
        </div>
      </div>

      {/* Sub-strategy Drawer */}
      <StrategyDrawer
        parentName={data.name}
        strategies={data.subStrategies}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
};

const StrategiesDashboard: React.FC = () => {
  const strategies = strategiesJson as StrategyData[];

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 sm:py-10 md:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {strategies.map((strategy, index) => (
            <StrategyCard key={index} data={strategy} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategiesDashboard;
