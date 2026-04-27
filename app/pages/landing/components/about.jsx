"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Globe, BarChart3, Info, AlertTriangle, Scale, ArrowRight } from "lucide-react";
import Image from "next/image";

const AboutGemalgo = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const highlights = [
        {
            text: "Gemalgo's proven track record: 6 years of verified performance",
            icon: <Zap className="w-5 h-5 text-blue-400" />
        },
        {
            text: "Gemalgo's risk management: Minimal drawdowns under 3%",
            icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
        },
        {
            text: "Gemalgo's consistency: 90%+ winning months across all accounts",
            icon: <BarChart3 className="w-5 h-5 text-cyan-400" />
        },
        {
            text: "Gemalgo's transparency: Real account data, real results",
            icon: <Globe className="w-5 h-5 text-sky-400" />
        }
    ];

    return (
        <section id="about" className="relative w-full overflow-hidden bg-[#020617] text-white antialiased selection:bg-blue-500/30">
            {/* Cinematic Background Elements */}
            {/* TOP BLEND */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-32 z-[2] 
bg-gradient-to-b from-[#0a0613] via-[#0a0613]/60 to-transparent" />

            {/* BOTTOM BLEND */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-[2] 
bg-gradient-to-t from-[#0a0613] via-[#0a0613]/60 to-transparent" />

            <div className="absolute inset-0 z-0">
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] opacity-20 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at 50% 20%, rgba(37, 99, 235, 0.3) 0%, transparent 70%)"
                    }}
                />
                {/* Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "60px 60px"
                    }}
                />
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl px-5 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32">

                {/* Header Section */}
                <motion.div {...fadeIn} className="text-center mb-10 sm:mb-14 md:mb-20">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium tracking-wider text-blue-300 uppercase">
                        Our Identity
                    </span>
                    <h1 className="mx-auto mb-6 max-w-4xl text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500">
                        About <span className="text-blue-500">Gemalgo</span>:
                        <br />
                        <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl text-gray-400">Advanced Algorithmic Trading</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-slate-400">
                        Bridging the gap between institutional grade automation and the individual investor through sophisticated AI driven execution.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">

                    {/* Main Narrative Column */}
                    <div className="lg:col-span-7 space-y-20">

                        {/* What is Gemalgo? */}
                        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="relative group">
                            <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent hidden md:block" />
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-0.5 w-12 bg-blue-600 rounded-full" />
                                <h2 className="text-sm font-bold tracking-[0.3em] text-blue-500 uppercase">Executive Summary</h2>
                            </div>
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 leading-tight">
                                Intelligence in Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Execution</span>
                            </h3>
                            <div className="space-y-6 sm:space-y-8 text-slate-400 leading-relaxed text-base sm:text-lg">
                                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:mr-3 first-letter:float-left">
                                    Gemalgo is a cutting edge algorithmic trading platform that leverages the power of artificial intelligence through the <span className="text-blue-100 font-semibold underline decoration-blue-500/50 underline-offset-4">NikolAI Algorithm</span>.
                                    We provide institutional grade trading automation designed for conservative investors seeking consistent, reliable returns.
                                </p>
                                <div className="relative p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05]  overflow-hidden group-hover:border-blue-500/20 transition-all duration-500">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5  rounded-full" />
                                    <p className="relative z-10 text-slate-300">
                                        The Gemalgo platform has been rigorously tested across multiple market conditions and account sizes, demonstrating exceptional performance with success rates exceeding <span className="text-emerald-400 font-bold tracking-tight">88% positive months</span>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Trading Performance Section */}
                        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="relative">
                            <div className="absolute inset-0 bg-blue-600/5  rounded-full pointer-events-none" />
                            <div className="relative bg-[#0a0a16]/80 border border-white/[0.05] rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 overflow-hidden shadow-2xl">
                                <div className="flex justify-between items-start mb-6 sm:mb-8 md:mb-10">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">Verified Live Feed</span>
                                        </div>
                                        <h4 className="text-xl sm:text-2xl font-bold text-white">System Reliability</h4>
                                    </div>
                                    <BarChart3 className="w-8 h-8 text-blue-500/50" />
                                </div>
                                <p className="text-slate-400 mb-6 sm:mb-8 md:mb-10 leading-relaxed text-sm sm:text-base italic border-l-2 border-white/5 pl-4 sm:pl-6">
                                    &quot;From long term performance to recent monthly gains, our data demonstrates the structural strength and algorithmic reliability of Gemalgo.&quot;
                                </p>
                                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                                    <a href="https://gemalgo.trade" target="_blank" rel="noopener noreferrer" className="group/btn relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-bold text-sm transition-all hover:bg-blue-50 hover:scale-[1.02] active:scale-95">
                                        Performance Reports
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </a>
                                    <a href="https://gemalgo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>



                    {/* Features Sidebar Column */}
                    <div className="lg:col-span-5 space-y-10">
                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.3 }}
                            className="bg-[#0f111a]/50 border border-white/[0.05] rounded-2xl sm:rounded-[3rem] p-6 sm:p-8 md:p-10 sticky top-24  shadow-[0_0_50px_rgba(0,0,0,0.3)]"
                        >
                            <div className="flex items-center gap-3 mb-6 sm:mb-8 md:mb-10">
                                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                                    <Zap className="w-5 h-5 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Platform Core</h3>
                            </div>

                            <div className="space-y-6 sm:space-y-8 md:space-y-10">
                                {highlights.map((item, idx) => (
                                    <div key={idx} className="flex gap-5 group cursor-default">
                                        <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-blue-600/30 group-hover:bg-blue-500 transition-colors duration-500 shadow-[0_0_10px_rgba(59,130,246,0)] group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                                        <div>
                                            <p className="text-slate-300 font-medium leading-tight group-hover:text-white transition-colors text-sm">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 sm:mt-12 md:mt-16 pt-8 sm:pt-10 border-t border-white/5">
                                <div className="flex items-center gap-3 sm:gap-4 group">
                                    <div className="relative h-14 w-10 sm:h-14 sm:w-14 flex-shrink-0 rounded-xl sm:rounded-2xl  p-1 sm:p-1.5 overflow-hidden  transition-all duration-500">
                                        <img
                                            src="/g3.png"
                                            alt="Gemalgo Logo"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-white font-bold tracking-tight text-xs sm:text-base">Gemalgo Global</p>
                                        <p className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Engineering Team</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full mx-auto my-10 rounded-lg overflow-hidden">
                    <Image alt="sean image" src={"/seanfull.webp"} width={1920} height={1080} className="w-full h-auto object-cover" />
                </div>

                {/* Institutional Compliance & Risk Section */}
                <div className="mt-16 sm:mt-24 md:mt-40 pt-12 sm:pt-16 md:pt-20 border-t border-white/5">
                    <motion.div {...fadeIn} className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16">
                            <div>
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                                    <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                                    Legal Compliance & Risk Disclosure
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">Version 4.41(b) • Last updated January 2026</p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                                <div className="px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                                    NFA Registered
                                </div>
                                <div className="px-3 py-1 rounded-md bg-slate-800/50 border border-slate-700 text-[10px] text-slate-400 font-mono tracking-widest uppercase">
                                    CFTC Compliant
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                            {/* Company Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                                    <Info className="w-3 h-3" />
                                    Entity Disclosure
                                </div>
                                <p className="text-slate-500 text-xs leading-relaxed text-justify">
                                    Gemalgo is a software company. Gemalgo does not provide commodity trading advice based on, or tailored to, the commodity interest or cash market positions or other circumstances or characteristics of particular clients nor does Gemalgo direct any subscriber accounts. We do not sell a business opportunity, &quot;get rich quick&quot; program or money-making system. All material presented is proprietary intellectual property.
                                </p>
                            </div>

                            {/* Performance Disclosure */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-amber-500/70 tracking-[0.2em] uppercase">
                                    <AlertTriangle className="w-3 h-3" />
                                    Performance Analytics
                                </div>
                                <p className="text-slate-500 text-xs leading-relaxed text-justify italic">
                                    PAST PERFORMANCE IS NOT A GUARANTEE OR A RELIABLE INDICATOR OF FUTURE RESULTS. Results shown represent top-performing configurations and are not typical for all users. Capital activity mid-month can materially impact individual results.
                                </p>
                            </div>

                            {/* Risk Management */}
                            <div className="md:col-span-2 space-y-6 pt-8 border-t border-white/5">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-red-500/50 tracking-[0.2em] uppercase">
                                    <Scale className="w-3 h-3" />
                                    Margin & Leverage Risk Warning
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-500 text-[11px] leading-secondary leading-relaxed">
                                    <div className="space-y-4">
                                        <p>
                                            Trading foreign exchange (&quot;forex&quot;) on margin carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to invest, you should carefully consider your objectives, experience level, and risk appetite.
                                        </p>
                                        <p>
                                            Neither Gemalgo nor its affiliates are intermediaries (SEC/CFTC registered brokers). All purchasers are encouraged to consult with a registered investment professional before implementing any trading strategy.
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <p>
                                            *CFTC Rule 4.41(b)(1)/NFA Rule 2-29 - Simulated or hypothetical performance results have certain inherent limitations. Unlike an actual performance record, these do not represent actual trading and may not account for market factors such as liquidity and slippage.
                                        </p>
                                        <p>
                                            This website is intended for educational purposes only and DOES NOT constitute individual investment advice. You should seek personally-tailored professional advice prior to making any investment of capital you cannot afford to lose.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Indexing & Meta Data (Ultra-Subtle) */}
                        <div className="mt-12 sm:mt-16 md:mt-20 pt-8 sm:pt-10 border-t border-white/5 flex flex-wrap justify-center gap-x-4 sm:gap-x-8 gap-y-3">
                            {["Gemalgo Intelligence", "NikolAI Execution", "Automated Compliance", "Risk Architecture", "Institutional Terminal"].map((keyword, i) => (
                                <span key={i} className="text-[10px] text-slate-500 font-medium tracking-widest uppercase hover:text-slate-700 transition-colors cursor-default">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* Bottom Glow Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] opacity-10 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 50% 100%, rgba(37, 99, 235, 0.4) 0%, transparent 60%)"
                }}
            />
        </section>
    );
};

export default AboutGemalgo;
