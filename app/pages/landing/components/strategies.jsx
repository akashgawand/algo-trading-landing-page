"use client";
import StrategiesDashboard from "./strategyCard";



export const Strategies = () => {

    return (
        <section id="strategies" className="bg-[#01030b] h-screen w-full">
            {/* Header */}
            <div className="text-center  mb-5">

                <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-4 tracking-tight">
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