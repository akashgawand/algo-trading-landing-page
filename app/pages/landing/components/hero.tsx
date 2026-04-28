"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// Replicates the JS ease-out cubic: 1 - (1 - t)^3
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function HeroSaaS() {
  // Track raw window scroll (no target = tracks window.scrollY)
  const { scrollY } = useScroll();

  // Mirror the JS logic:
  //   startTrigger = windowHeight * 0.2
  //   endTrigger   = windowHeight * 0.8
  // We use a fixed viewport estimate of 900px (framer's useTransform runs client-side,
  // so the actual vh is correct at runtime via useViewportScroll internals).
  // Better: derive from a ref so it stays accurate.
  const sectionRef = useRef<HTMLElement>(null);

  // Raw linear progress [0,1] mapped from scrollY [vh*0.2 → vh*0.8]
  // useTransform clamps automatically.
  const rawProgress = useTransform(scrollY, (y) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;
    const start = vh * 0.2;
    const end = vh * 0.8;
    const p = (y - start) / (end - start);
    return Math.max(0, Math.min(1, p));
  });

  // Apply ease-out cubic on top of the raw progress
  const eased = useTransform(rawProgress, easeOutCubic);

  // Smooth spring so rapid scroll doesn't jitter (light spring, fast response)
  const progress = useSpring(eased, { stiffness: 200, damping: 30, mass: 0.5 });

  // Individual animated values
  const rotateX = useTransform(progress, [0, 1], [45, 0]); // 45deg → 0
  const scale = useTransform(progress, [0, 1], [0.8, 1]); // 0.8 → 1
  const translateY = useTransform(progress, [0, 1], [40, 0]); // 40px → 0 (Pulling start position up to fill gap)
  const opacity = useTransform(progress, [0, 1], [0.3, 1]); // 0.3 → 1
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-screen flex flex-col justify-center md:block overflow-hidden bg-[#020617] font-sans text-white antialiased pt-24 pb-8 sm:pt-28 sm:pb-12 md:pb-32 md:pt-40">
      {/* GRID OVERLAY — fades toward edges, lives in the glow zone */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 38%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.5) 48%, rgba(0,0,0,0.12) 68%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse at 50% 38%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.5) 48%, rgba(0,0,0,0.12) 68%, transparent 88%)",
          willChange: "transform",
        }}
      />
      <Image
        src="/glowingplanet3.jpg"
        alt=""
        fill
        priority
        className="pointer-events-none object-cover opacity-45 contrast-125"
        style={{ zIndex: 0 }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-5 sm:px-6 text-center md:px-6">
        {/* =========================================
            HERO CONTENT
            ========================================= */}
        <div
          className="relative z-20 transform-gpu will-change-transform" // <-- Added here
        >
          <div className="absolute left-[-20%] top-[30%] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] opacity-30">
            <div
              className="w-full h-full rounded-full"
              // style={{
              //   background:
              //     "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
              // }}
            />
          </div>

          <span className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-[10px] sm:text-xs font-medium tracking-wide text-blue-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
            NEXT GENERATION OF TRADING
          </span>

          <h1 className="mx-auto mb-4 sm:mb-6 max-w-4xl font-sans text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
            Trade Smarter with <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              AI-Powered
            </span>{" "}
            Strategy
          </h1>

          <p className="mx-auto mb-8 sm:mb-10 max-w-2xl text-sm sm:text-base md:text-lg tracking-wide text-slate-400 lg:text-xl px-2 sm:px-0">
            Gemalgo combines artificial intelligence with cutting edge trading
            strategies to help you maximize your investments with precision and
            ease.
          </p>

          <div className="mb-8 sm:mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row z-30 relative px-4 sm:px-0">
            <a
              href="https://go.gemalgo.ai/video-1"
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.3),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 sm:w-auto"
            >
              Get Started
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>

          <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-blue-400/40 to-transparent opacity-40" />
          <div className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-blue-400/40 to-transparent opacity-40" />
        </div>

        {/* =========================================
            LAYER 4: FOREGROUND DASHBOARD (UI MATERIAL)
            ========================================= */}
      </div>

      <div
        style={{ perspective: "2000px" }}
        className="hidden md:block relative z-10 mx-auto max-w-5xl px-4"
      >
        {/* === DESKTOP ANIMATED DASHBOARD === */}
        <motion.div
          className="transform-gpu will-change-transform"
          style={{
            rotateX,
            scale,
            y: translateY,
            opacity,
            transformOrigin: "50% 100%", // pivot from bottom-center for the tilt-in feel
          }}
        >
          <div
            style={{ contain: "paint" }}
            className="pointer-events-none absolute -top-[2px] left-1/2 -translate-x-1/2 w-[92%] h-[2px]"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `
        linear-gradient(
          to right,
          transparent 0%,
          rgba(147,197,253,0.4) 20%,
          rgba(191,219,254,0.9) 50%,
          rgba(147,197,253,0.4) 80%,
          transparent 100%
        )
      `,
              }}
            />

            <div
              className="absolute inset-0 "
              style={{
                background: `
        linear-gradient(
          to right,
          transparent 0%,
          rgba(59,130,246,0.5) 25%,
          rgba(96,165,250,0.8) 50%,
          rgba(59,130,246,0.5) 75%,
          transparent 100%
        )
      `,
              }}
            />

            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[120%] h-[120px] "
              style={{
                background: `
        radial-gradient(
          ellipse at center,
          rgba(59,130,246,0.25) 0%,
          rgba(59,130,246,0.12) 30%,
          rgba(59,130,246,0.05) 50%,
          transparent 75%
        )
      `,
              }}
            />
          </div>

          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent opacity-90 shadow-[0_0_15px_rgba(147,197,253,0.5)]" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/70 p-2 shadow-[...]">
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-400/5 to-transparent pointer-events-none" />

            <Image
              src="/dashboard.png"
              alt="dashboard"
              width={1600}
              height={900}
              sizes="(max-width: 768px) 100vw, 80vw"
              className="w-full h-auto object-contain"
              quality={100}
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* <div className="mt-16 sm:mt-24 w-full flex flex-col items-center">
        <p className="mb-4 text-sm sm:text-base font-medium tracking-widest text-slate-400 uppercase text-center px-4">
          Trade On Trusted US Regulated Brokers
        </p>
        <div className="w-full overflow-hidden relative py-8 border-y border-white/5 bg-white/[0.01]">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020617] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020617] to-transparent z-10" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
          className="flex w-fit whitespace-nowrap items-center"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 sm:gap-20 px-6 sm:px-10">
              {[
                "Forex.com",
                "Interactive Brokers",
                "Alpaca",
                "E*TRADE",
                "NinjaTrader",
                "Robinhood",
                "StoneX",
                "tastytrade",
                "TradeStation",
                "Webull",
              ].map((name, idx) => (
                <span
                  key={idx}
                  className="text-lg sm:text-xl font-bold text-slate-500 uppercase tracking-widest hover:text-blue-400 transition-colors duration-300"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
      </div> */}
    </section>
  );
}
