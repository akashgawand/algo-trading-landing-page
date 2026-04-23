"use client";
import StrategiesDashboard from "./strategyCard";



export const Strategies = () => {

    return (
        <section id="strategies" className="bg-[#01030b] min-h-screen w-full py-10 sm:py-12 md:py-20">
            {/* Header */}
            <div className="text-center px-5 sm:px-6 mb-5">

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
                    Proven Performance Across Strategies<br className="hidden sm:block" />
                    <span className="text-blue-200/80"> Backed by Real Capital Growth</span>
                </h2>
                {/* <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Live results from AI-driven systems trading across stocks, futures, and forex markets with consistent execution.
                </p> */}
            </div>

            <StrategiesDashboard />
            <div className="mt-16 px-5 sm:px-6 max-w-6xl mx-auto">
                <h3 className="text-center text-white text-lg sm:text-xl font-medium mb-6">
                    Trade On Trusted US Regulated Brokers
                </h3>
                <div className="bg-white rounded-xl py-8 px-6 sm:px-10 shadow-lg">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center">
                        {/* Top Row */}
                        <div className="flex items-center justify-center w-full h-12">
                            <img src="/forexcom.webp" alt="FOREX.com" className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex items-center justify-center w-full h-12">
                            <img src="/interactivebrokers.webp" alt="Interactive Brokers" className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex items-center justify-center w-full h-12">
                            <span className="text-[#1e293b] font-bold text-xl tracking-tight">Alpaca</span>
                        </div>
                        <div className="flex items-center justify-center w-full h-12">
                            <span className="text-[#16a34a] font-bold text-xl tracking-tight">E*TRADE</span>
                        </div>
                        <div className="flex items-center justify-center w-full h-12">
                            <span className="text-[#ea580c] font-bold text-xl tracking-tight">NinjaTrader</span>
                        </div>
                        
                        {/* Bottom Row */}
                        <div className="flex items-center justify-center w-full h-12">
                            <span className="text-[#22c55e] font-bold text-xl tracking-tight">Robinhood</span>
                        </div>
                        <div className="flex items-center justify-center w-full h-12">
                            <span className="text-[#1e3a8a] font-bold text-xl tracking-tight">StoneX</span>
                        </div>
                        <div className="flex items-center justify-center w-full h-12">
                            <span className="text-[#0f172a] font-bold text-xl tracking-tight">tastytrade</span>
                        </div>
                        <div className="flex items-center justify-center w-full h-12">
                            <span className="text-[#2563eb] font-bold text-xl tracking-tight">TradeStation</span>
                        </div>
                        <div className="flex items-center justify-center w-full h-12">
                            <span className="text-[#3b82f6] font-bold text-xl tracking-tight">Webull</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    )
    
}