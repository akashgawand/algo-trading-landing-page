"use client";

import { useState, useEffect } from "react";
import { AISpokesperson } from "./AISpokesperson";

export default function AISpokespersonWidget() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip 2 seconds after component mounts
    const initialTimer = setTimeout(() => setShowTooltip(true), 2000);
    
    // Hide it after 8 seconds
    const hideTimer = setTimeout(() => setShowTooltip(false), 8000);

    // Periodically show it every 25 seconds for 6 seconds
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 6000);
    }, 25000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body.strategy-drawer-open .ai-spokesperson-widget {
          display: none !important;
        }
        @keyframes float-fab {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .animate-float-fab {
          animation: float-fab 3s ease-in-out infinite;
        }
      `}</style>
      <div className="ai-spokesperson-widget fixed bottom-6 right-6 z-[100] drop-shadow-2xl transition-opacity duration-300">
        
        {/* Desktop View: Always show the full widget */}
        <div className="hidden md:block">
          <AISpokesperson onClose={() => setIsVisible(false)} />
        </div>

        {/* Mobile View: FAB -> Widget */}
        <div className="md:hidden flex flex-col items-end relative">
          {!isMobileOpen ? (
            <>
              {/* Notification Bubble Pop-up */}
              <div 
                className={`absolute bottom-[60px] right-0 mb-3 w-52 bg-blue-600 text-white text-xs font-semibold py-3 px-4 rounded-2xl rounded-br-sm shadow-[0_4px_20px_rgba(37,99,235,0.4)] border border-blue-400/30 transition-all duration-500 transform origin-bottom-right ${
                  showTooltip ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-xl leading-none">👋</span>
                  <p className="leading-tight">Skip reading! Click here to listen to the reports directly.</p>
                </div>
              </div>

              {/* The Floating Avatar Button */}
              <button
                onClick={() => {
                  setIsMobileOpen(true);
                  setShowTooltip(false);
                }}
                className="relative w-14 h-14 rounded-full border-2 border-blue-500 bg-[#0B1221] shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center justify-center overflow-hidden hover:scale-105 transition-transform animate-float-fab cursor-pointer"
              >
                <img src="/sean.jpg" alt="Sean" className="w-full h-full object-cover" />
                {/* Red Notification Dot */}
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[#0B1221] rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
              </button>
            </>
          ) : (
            <AISpokesperson 
              onClose={() => setIsMobileOpen(false)} 
              isMobile={true} 
            />
          )}
        </div>

      </div>
    </>
  );
}
