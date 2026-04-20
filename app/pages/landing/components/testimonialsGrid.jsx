import React from "react";
import { Star, X, Search, Quote, Heart, Eye, ArrowRight, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const TestimonialsGrid = () => {
    return (
        <div id="testimonials" className="min-h-screen bg-[#060613] px-4 py-8 sm:p-6 md:p-8 relative overflow-hidden">
            {/* TOP BLEND */}
            <div className="pointer-events-none absolute top-0 left-0 w-full h-32 z-[2] 
bg-gradient-to-b from-[#0a0613] via-[#0a0613]/60 to-transparent" />

            {/* BOTTOM BLEND */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-32 z-[2] 
bg-gradient-to-t from-[#0a0613] via-[#0a0613]/60 to-transparent" />
            
            {/* Background gradient effects - no blur */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-2xl rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 blur-2xl rounded-full" />
            <div
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{
                    background: `
      radial-gradient(circle at top left, rgba(37,99,235,0.25), transparent 55%),
      radial-gradient(circle at bottom right, rgba(37,99,235,0.25), transparent 55%)
    `,
                }}
            />
            <div className="text-center pt-6 sm:pt-8 md:pt-10 mb-5">

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
                    What Our Users Say<br className="hidden sm:block" />
                    <span className="text-blue-200/80"> Real Feedback from Real Traders</span>
                </h2>
                {/* <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Live results from AI-driven systems trading across stocks, futures, and forex markets with consistent execution.
                </p> */}
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-min">

                    {/* Left Column - Top Card with Image */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 lg:row-span-2 bg-white/[0.03] rounded-3xl p-4 sm:p-5 border border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group transition-all duration-500 hover:bg-white/[0.06]">
                        
                        <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                            ))}
                        </div>
                        <h3 className="text-white font-semibold text-sm mb-3 leading-relaxed">
                            I was skeptical at first, but the results speak for themselves. 
                            Over 90% positive months and the conservative approach gives me peace of mind. Highly recommend!
                        </h3>
                        <div className="flex gap-2 mb-4">
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-full font-medium border border-emerald-500/20">
                                SC
                            </span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] rounded-full font-medium border border-blue-500/20">
                                1 month ago
                            </span>
                        </div>
                        <p className="text-gray-500 text-xs mb-4">- Sarah Chen -</p>
                        <div className="rounded-2xl overflow-hidden h-32 bg-gray-800">
                            <img
                                src="https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=400&h=300&fit=crop"
                                alt="Unboxing"
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 lg:col-span-3 bg-white/[0.03] rounded-3xl p-4 sm:p-5 border border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] relative group transition-all duration-500 hover:bg-white/[0.06]">
                        <p className="text-gray-400 text-xs leading-relaxed mb-3">
                            The NikolAI Algorithm has been a game-changer for my portfolio. Consistent returns month after month with minimal drawdowns. The team at Gemalgo is professional and responsive.
                        </p>
                        <div className="flex items-center gap-2 ">
                             <span className="text-emerald-400 text-[10px] font-bold">SC</span>
                             <span className="text-gray-500 text-[10px]">Michael Thompson • 2 weeks ago</span>
                        </div>
                        
                    </div>

                    {/* Top Right - Fann Dofer Quote */}
                    <div className="col-span-1 lg:col-span-3 bg-white/[0.03] rounded-3xl p-4 sm:p-5 border border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] group transition-all duration-500 hover:bg-white/[0.06]">
                        <Quote className="w-8 h-8 text-blue-500/40 mb-3" />
                        <p className="text-gray-400 text-[11px] leading-relaxed mb-3">
                            Finally found an algorithm that actually works as advertised. The transparency with multiple accounts and real performance data builds trust.
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                                ))}
                            </div>
                            <div className="flex items-center gap-2 ml-auto">
                                <span className="text-gray-300 text-xs font-medium">David Rodriguez</span>
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                                    DR
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Incredible Service */}
                    <div className="col-span-1 lg:col-span-3 lg:row-span-2 bg-white/[0.03] rounded-3xl overflow-hidden border border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] relative group transition-all duration-500 hover:bg-white/[0.06] sm:col-span-2 md:col-span-1 flex flex-col sm:flex-row lg:flex-col items-center lg:items-stretch">
                        <div className="p-5 flex-1">
                            <p className="text-gray-400 text-xs mb-1">26 Mar 2029</p>
                            <h3 className="text-white text-xl font-bold mb-1">Incredible<br />service</h3>
                            <p className="text-gray-400 text-sm mb-3">Perfect, exceeded<br />expectations</p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                                ))}
                            </div>
                        </div>
                        <div className="h-40 w-full sm:w-40 lg:w-full shrink-0">
                            <Image
                                src="/testimonial.png"
                                alt="Customer service"
                                width={400}
                                height={400}
                                className="w-full h-full object-cover object-top rounded-2xl p-2"
                            />
                        </div>
                    </div>

                    {/* Center - Matthew Smith (Large) */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-4 lg:row-span-2 bg-white/[0.04] rounded-3xl p-5 sm:p-6 border border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.1),0_30px_60px_rgba(0,0,0,0.5)] relative group transition-all duration-500 hover:bg-white/[0.08]">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute top-4 right-4">
                            <MoreHorizontal className="w-5 h-5 text-gray-500 cursor-pointer" />
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg font-bold text-emerald-400 border border-emerald-500/30">
                                DR
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-semibold text-sm">David Rodriguez</h4>
                                <p className="text-gray-500 text-xs">Verified Algorithmic Trader • 3 weeks ago</p>
                            </div>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                                ))}
                            </div>
                        </div>
                        <h2 className="text-white text-xl font-bold leading-tight mb-2">
                            Finally found an algorithm that actually works as advertised. The transparency with multiple accounts and real performance data builds trust. Excellent service.
                        </h2>
                    </div>

                    {/* Service Rating */}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-2 bg-white/[0.03] rounded-3xl p-4 border border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05)] transition-all duration-500 hover:bg-white/[0.06]">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-white font-bold text-lg">09+</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        </div>
                        <h4 className="text-white text-sm font-semibold mb-1">Service Rating</h4>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                            <span>(5/5) from 419 customers</span>
                        </div>
                    </div>

                    {/* Bottom Left - Elizabeth Jones */}
                    <div className="col-span-1 lg:col-span-3 bg-white/[0.03] rounded-3xl p-4 sm:p-5 border border-white/10 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05)] group transition-all duration-500 hover:bg-white/[0.06]">
                        <div className="flex gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                            ))}
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed mb-4">
                            The performance has exceeded my expectations. Conservative, consistent, and proven - exactly what they promise. Great communication and support from the Gemalgo team.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] rounded-full border border-blue-500/20 font-medium">
                                JW
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <p className="text-white text-xs font-semibold">Jennifer Walsh</p>
                                    <p className="text-gray-500 text-[10px]">1 month ago</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                                    JW
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Your Feedback */}
                    <div className="col-span-1 lg:col-span-3 bg-white/[0.04] rounded-[2rem] p-4 sm:p-5 border border-white/15 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.4)] relative group transition-all duration-500 hover:bg-white/[0.08]">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-gray-400 text-xs">Sarah Chen</span>
                            <span className="text-gray-600 text-xs">•</span>
                            <span className="text-gray-500 text-xs">1 month ago</span>
                        </div>
                        <h3 className="text-white text-lg font-bold mb-2">Verified Performance</h3>
                        <p className="text-gray-400 text-xs leading-relaxed mb-4">
                            I was skeptical at first, but the results speak for themselves. Over 90% positive months and the conservative approach gives me peace of mind. Highly recommend!
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                                ))}
                            </div>
                            <span className="text-emerald-400 text-xs font-bold">SC</span>
                        </div>
                    </div>

                    {/* Client Reviews Search */}
                  

                   

                </div>
            </div>
        </div>
    );
};

export default TestimonialsGrid;