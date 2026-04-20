"use client";
import StrategiesDashboard from "./strategyCard";



export const Strategies = () => {

    return (
        <section id="strategies" className="bg-[#01030b] min-h-screen w-full py-12 md:py-20">
            {/* Header */}
            <div className="text-center px-4 mb-5">

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
                    Proven Performance Across Strategies<br />
                    <span className="text-blue-200/80">Backed by Real Capital Growth</span>
                </h2>
                {/* <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                    Live results from AI-driven systems trading across stocks, futures, and forex markets with consistent execution.
                </p> */}
            </div>

            <StrategiesDashboard />
            
        </section>
    )
    
}