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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-8 items-center justify-items-center">
                        {/* Alphabetical order by brand name */}
                        {/* Alpaca */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/alpaca2.png" alt="Alpaca" className="w-28 h-16 object-contain" />
                        </div>
                        {/* E*TRADE */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/etrade.png" alt="E*TRADE" className="w-28 h-18 object-contain" />
                        </div>
                        {/* FOREX.com */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/forexcom.webp" alt="FOREX.com" className="w-28 h-8 object-contain" />
                        </div>
                        {/* Interactive Brokers */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/interactivebrokers.webp" alt="Interactive Brokers" className="w-28 h-10 object-contain" />
                        </div>
                        {/* NinjaTrader */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/ninjatrader.png" alt="NinjaTrader" className="w-28 h-18 object-contain" />
                        </div>
                        {/* Robinhood */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/robinhood.png" alt="Robinhood" className="w-28 h-18 object-contain" />
                        </div>
                        {/* StoneX */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/stonx.png" alt="StoneX" className="w-28 h-10 object-contain" />
                        </div>
                        {/* tastytrade */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/tastytrade.png" alt="tastytrade" className="w-28 h-16 object-contain" />
                        </div>
                        {/* TradeStation */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/tradestation.png" alt="TradeStation" className="w-28 h-16 object-contain" />
                        </div>
                        {/* Webull */}
                        <div className="flex items-center justify-center w-full h-14 px-2">
                            <img src="/brands/webull.png" alt="Webull" className="w-28 h-18 object-contain" />
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    )
    
}