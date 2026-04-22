"use client";

import { useState } from "react";
import { AISpokesperson } from "./AISpokesperson";

export default function AISpokespersonWidget() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body.strategy-drawer-open .ai-spokesperson-widget {
          display: none !important;
        }
      `}</style>
      <div className="ai-spokesperson-widget fixed bottom-6 right-6 z-[100] drop-shadow-2xl transition-opacity duration-300">
        <AISpokesperson onClose={() => setIsVisible(false)} />
      </div>
    </>
  );
}
