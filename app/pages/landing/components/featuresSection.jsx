"use client"
import {
    Wallet,
    TrendingUp,
    Link2,
    CreditCard,
    BarChart3,
    Layers,
    ArrowUpRight,
    Github,
    Box,
    Triangle,
    FileText
} from 'lucide-react';
import { IBKRIcon } from './icons/IbkrIcon';
import { AlpacaIcon } from './icons/AlpacaIcon';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip as RechartsTooltip
} from 'recharts';

const barData = [
    { name: 'Jan', value: 40 },
    { name: 'Feb', value: 65 },
    { name: 'Mar', value: 85 },
    { name: 'Apr', value: 45 },
    { name: 'May', value: 60 },
    { name: 'Jun', value: 35 },
    { name: 'Jul', value: 55 },
];

const lineData = [
    { name: '0', income: 20, outcome: 15 },
    { name: '1', income: 25, outcome: 18 },
    { name: '2', income: 22, outcome: 20 },
    { name: '3', income: 30, outcome: 22 },
    { name: '4', income: 28, outcome: 25 },
    { name: '5', income: 35, outcome: 28 },
    { name: '6', income: 32, outcome: 30 },
    { name: '7', income: 40, outcome: 32 },
    { name: '8', income: 38, outcome: 35 },
    { name: '9', income: 45, outcome: 38 },
    { name: '10', income: 42, outcome: 40 },
    { name: '11', income: 48, outcome: 42 },
    { name: '12', income: 55, outcome: 45 },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative min-h-screen bg-[#060613] py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Top-side shadow peak */}
            {/* <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-40 
bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35),rgba(59,130,246,0.15)_40%,transparent_80%)] 
blur-2xl opacity-80" /> */}


            {/* BOTTOM BLEND */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-[2] 
bg-gradient-to-t from-[#0a0613] via-[#0a0613]/60 to-transparent" />
            {/* Ambient background glows - shared lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full  pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full  pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mt-6 sm:mt-8 md:mt-12 mb-10 sm:mb-12 md:mb-16">

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
                        Discover the Features That Simplify<br className="hidden sm:block" />
                        <span className="text-blue-200/80"> and Empower Your Finances</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                        Everything you need to manage, track, and grow your money — all in one intuitive platform
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

                    {/* Card 1: Smarter Tracking */}
                    <div className="group relative lg:col-span-1">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-cyan-500/5 rounded-3xl  opacity-30 group-hover:opacity-50 transition duration-500" />
                        <div className="relative h-full bg-[#0a0a0f]/80  border border-white/[0.08] rounded-3xl p-6 overflow-hidden">
                            {/* Bleeding light effect at bottom */}
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/20 via-cyan-500/10 to-transparent " />

                            <div className="relative z-10">
                                <h3 className="text-xl font-semibold text-white mb-2">Smarter Tracking</h3>
                                <p className="text-sm text-gray-400 mb-6">Automate expense and income records in real time.</p>

                                <div className="relative bg-[#0f1117]/50 rounded-2xl p-4 border border-white/[0.05]">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                            <Layers className="w-3 h-3 text-blue-400" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-300">Spending Trends</span>
                                    </div>

                                    <div className="h-32">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={barData}>
                                                <Bar
                                                    dataKey="value"
                                                    fill="url(#blueGradient)"
                                                    radius={[4, 4, 4, 4]}
                                                    maxBarSize={20}
                                                />
                                                <defs>
                                                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.8} />
                                                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                                                    </linearGradient>
                                                </defs>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Automate Finances */}
                    <div className="group relative lg:col-span-1">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-cyan-500/5 rounded-3xl  opacity-30 group-hover:opacity-50 transition duration-500" />
                        <div className="relative h-full bg-[#0a0a0f]/80  border border-white/[0.08] rounded-3xl p-6 overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/20 via-cyan-500/10 to-transparent " />

                            <div className="relative z-10">
                                <h3 className="text-xl font-semibold text-white mb-2">Automate Finances</h3>
                                <p className="text-sm text-gray-400 mb-6">Connect accounts and sync data automatically.</p>

                                <div className="space-y-3">
                                    {[
                                        { icon: Layers, label: 'Expense Tracking', color: 'bg-blue-500/20 text-blue-400' },
                                        { icon: TrendingUp, label: 'Income Syncing', color: 'bg-cyan-500/20 text-cyan-400' },
                                        { icon: CreditCard, label: 'Balance Monitoring', color: 'bg-indigo-500/20 text-indigo-400' },
                                        { icon: BarChart3, label: 'Profit Analysis', color: 'bg-sky-500/20 text-sky-400' },
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-[#0f1117]/50 border border-white/[0.05] ">
                                            <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-300">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Seamless Integrations */}
                    <div className="group relative lg:col-span-1">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-cyan-500/5 rounded-3xl  opacity-30 group-hover:opacity-50 transition duration-500" />
                        <div className="relative h-full bg-[#0a0a0f]/80  border border-white/[0.08] rounded-3xl p-6 overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/20 via-cyan-500/10 to-transparent " />

                            <div className="relative z-10">
                                <h3 className="text-xl font-semibold text-white mb-2">Seamless Integrations</h3>
                                <p className="text-sm text-gray-400 mb-6">Link your favorite apps for a connected experience.</p>

                                <div className="relative h-48 flex items-center justify-center">
                                    {/* Orbital layout of icons */}
                                    <div className="relative w-full h-full">
                                        {/* Center */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center  shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                                            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">G</span>
                                            </div>
                                        </div>

                                        {/* Orbiting icons */}
                                        <div className="absolute top-[15%] right-[20%] w-12 h-12 bg-[#0f1117]/80 border border-white/10 rounded-xl flex items-center justify-center">
                                            <IBKRIcon className="w-6 h-6 text-gray-400" />
                                        </div>
                                        <div className="absolute top-[30%] left-[15%] w-10 h-10 bg-[#0f1117]/80 border border-white/10 rounded-lg flex items-center justify-center">
                                            <Box className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div className="absolute bottom-[25%] right-[25%] w-11 h-11 bg-[#0f1117]/80 border border-white/10 rounded-xl flex items-center justify-center">
                                            <AlpacaIcon className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div className="absolute bottom-[20%] left-[25%] w-9 h-9 bg-[#0f1117]/80 border border-white/10 rounded-lg flex items-center justify-center ">
                                            <FileText className="w-4 h-4 text-indigo-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Cash Flow Snapshot */}
                    <div className="group relative lg:col-span-1">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-cyan-500/5 rounded-3xl  opacity-30 group-hover:opacity-50 transition duration-500" />
                        <div className="relative h-full bg-[#0a0a0f]/80  border border-white/[0.08] rounded-3xl p-6 overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/20 via-cyan-500/10 to-transparent " />

                            <div className="relative z-10">
                                <h3 className="text-xl font-semibold text-white mb-2">Cash Flow Snapshot</h3>
                                <p className="text-sm text-gray-400 mb-6">See monthly income, expenses, and balance at a glance.</p>

                                <div className="space-y-4">
                                    {/* Expenses Card */}
                                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#0f1117]/80 to-[#0a0a0f]/40 border border-white/[0.08]  overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500/50 to-orange-500/50" />
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">This Month&apos;s Expenses</p>
                                                <p className="text-sm text-gray-300">Your expenses this month total <span className="text-white font-semibold">$1,000</span></p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Income Card */}
                                    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#0f1117]/80 to-[#0a0a0f]/40 border border-white/[0.08]  overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 to-cyan-500/50" />
                                        <div className="flex justify-between items-start mb-1">
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">This Month&apos;s Incomes</p>
                                                <p className="text-sm text-gray-300">You&apos;ve earned <span className="text-white font-semibold">$9,000</span> this month.</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Visual Growth */}
                    <div className="group relative sm:col-span-2 lg:col-span-2">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-blue-500/20 to-cyan-500/5 rounded-3xl  opacity-30 group-hover:opacity-50 transition duration-500" />
                        <div className="relative h-full bg-[#0a0a0f]/80  border border-white/[0.08] rounded-3xl p-6 overflow-hidden">
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-600/20 via-cyan-500/10 to-transparent " />

                            <div className="relative z-10">
                                <h3 className="text-xl font-semibold text-white mb-2">Visual Growth</h3>
                                <p className="text-sm text-gray-400 mb-6">Track income trends and monitor profit margins with ease, helping you spot opportunities and stay in control.</p>

                                <div className="relative h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#3b82f6" />
                                                    <stop offset="50%" stopColor="#06b6d4" />
                                                    <stop offset="100%" stopColor="#3b82f6" />
                                                </linearGradient>
                                                <linearGradient id="lineGradient2" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#6366f1" />
                                                    <stop offset="100%" stopColor="#8b5cf6" />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#374151', fontSize: 12 }}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#374151', fontSize: 12 }}
                                            />
                                            <RechartsTooltip
                                                contentStyle={{
                                                    backgroundColor: '#0f1117',
                                                    border: '1px solid rgba(255,255,255,0.1)',
                                                    borderRadius: '12px',
                                                    backdropFilter: 'blur(1px)'
                                                }}
                                                itemStyle={{ color: '#e5e7eb' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="income"
                                                stroke="url(#lineGradient)"
                                                strokeWidth={3}
                                                dot={{ fill: '#0f1117', stroke: '#3b82f6', strokeWidth: 2, r: 4 }}
                                                activeDot={{ r: 6, strokeWidth: 0, fill: '#60a5fa' }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="outcome"
                                                stroke="url(#lineGradient2)"
                                                strokeWidth={2}
                                                strokeOpacity={0.5}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>

                                    {/* Floating tooltip-like element overlay (decorative) */}
                                    <div className="hidden sm:block absolute top-4 right-20 bg-[#0f1117]/90 border border-white/10 rounded-xl p-3 shadow-2xl">
                                        <p className="text-[10px] text-gray-500 mb-1">Jan 24, 2025</p>
                                        <div className="flex items-center gap-3 text-xs">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                <span className="text-gray-400">Income Details</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                                <span className="text-gray-400">Outcome Details</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 inline-flex items-center px-2 py-1 rounded-md bg-blue-600/20 border border-blue-500/30 text-[10px] text-blue-300">
                                            Close
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}