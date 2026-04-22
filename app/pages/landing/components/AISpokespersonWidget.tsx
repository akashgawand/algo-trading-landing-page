"use client";

import { useState } from "react";
import { AISpokesperson } from "./AISpokesperson";

export default function AISpokespersonWidget() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] drop-shadow-2xl">
      <AISpokesperson onClose={() => setIsVisible(false)} />
    </div>
  );
}
