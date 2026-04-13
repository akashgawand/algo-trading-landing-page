"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

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
    <section className="relative w-full min-h-screen overflow-hidden bg-[#020617] pb-20 pt-32 font-sans text-white antialiased md:pb-32 md:pt-40">
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

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full opacity-40 mix-blend-screen"
          style={{
            background:
              "radial-gradient(circle at center, rgba(30, 58, 138, 0.4) 0%, rgba(30, 58, 138, 0.1) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, rgba(3, 7, 18, 0.8) 0%, rgba(3, 7, 18, 0.4) 50%, transparent 80%)",
          }}
        />
      </div>

      {/* =========================================
          OVERHEAD LIGHTING SYSTEM (Premium Cinematic Glow)
          ========================================= */}
      {/* LIGHT + ARC SYSTEM */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Soft atmospheric top glow - OPTIMIZED GRADIENT */}
        <div
          className="absolute left-1/2 top-[-25%] h-[50rem] w-[80rem] -translate-x-1/2 rounded-full mix-blend-screen opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(96,165,250,0.18) 0%, rgba(96,165,250,0.1) 30%, rgba(96,165,250,0.03) 60%, transparent 85%)",
          }}
        />

        {/* Narrower hotspot - OPTIMIZED GRADIENT */}
        <div
          className="absolute left-1/2 top-[-5%] h-[30rem] w-[50rem] -translate-x-1/2 rounded-full mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(147,197,253,0.18) 0%, rgba(59,130,246,0.12) 20%, rgba(59,130,246,0.02) 50%, transparent 80%)",
          }}
        />

        {/* Tiny top sheen - LOW BLUR + GRADIENT FALLOFF */}
        <div
          className="absolute left-1/2 top-[1%] h-[12rem] w-[30rem] -translate-x-1/2 rounded-full blur-[20px] mix-blend-screen opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(147,197,253,0.08) 40%, transparent 80%)",
          }}
        />

        {/* Super sharp central focal point - MINIMAL BLUR */}
        <div
          className="absolute left-1/2 top-[4%] h-[4rem] w-[12rem] -translate-x-1/2 rounded-full blur-[10px] mix-blend-overlay opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 80%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-0 flex justify-center overflow-hidden">
          {/* LAYER 1: Deep atmospheric base (very subtle, wide spread) */}
          <div
            className="absolute top-[-35%] h-[1100px] w-[1500px] rounded-[100%] blur-[140px]"
            style={{
              background: `
        radial-gradient(
          ellipse at center,
          rgba(37,99,235,0.18) 0%,
          rgba(30,64,175,0.12) 25%,
          rgba(30,58,138,0.08) 45%,
          rgba(2,6,23,0.0) 75%
        )
      `,
            }}
          />

          {/* LAYER 2: Primary blue energy (dominant tone) */}
          <div
            className="absolute top-[-12%] h-[650px] w-[950px] rounded-[100%] blur-[120px] mix-blend-screen"
            style={{
              background: `
        radial-gradient(
          ellipse at center,
          rgba(59,130,246,0.35) 0%,
          rgba(59,130,246,0.22) 20%,
          rgba(37,99,235,0.14) 40%,
          rgba(37,99,235,0.06) 60%,
          transparent 80%
        )
      `,
            }}
          />

          {/* LAYER 3: Blue-white mixed halo (this creates premium feel) */}
          <div
            className="absolute top-[2%] h-[320px] w-[650px] rounded-[100%] blur-[90px] mix-blend-screen"
            style={{
              background: `
        radial-gradient(
          ellipse at center,
          rgba(255,255,255,0.22) 0%,
          rgba(191,219,254,0.20) 15%,
          rgba(96,165,250,0.18) 30%,
          rgba(59,130,246,0.10) 50%,
          rgba(59,130,246,0.04) 65%,
          transparent 85%
        )
      `,
            }}
          />

          {/* LAYER 4: Controlled white core (keep subtle, not overpowering) */}
          <div
            className="absolute top-[8%] h-[160px] w-[420px] rounded-[100%] blur-[70px] mix-blend-overlay"
            style={{
              background: `
        radial-gradient(
          ellipse at center,
          rgba(255,255,255,0.28) 0%,
          rgba(255,255,255,0.12) 25%,
          rgba(147,197,253,0.08) 50%,
          transparent 75%
        )
      `,
            }}
          />
        </div>

        {/* ARC GLOW BLOOM */}
        {/* NEW CSS-ONLY ARC SYSTEM (Zero SVG Overhead) */}
        <div className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[1180px] h-[560px] pointer-events-none">
          {/* 1. Wide ambient bloom behind the arc */}
          <div
            className="absolute left-1/2 top-[10%] -translate-x-1/2 w-[1000px] h-[400px] rounded-[100%] opacity-40"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0.1) 40%, transparent 70%)",
            }}
          />

          {/* 2. Mid structural glow */}
          <div
            className="absolute left-1/2 top-[16%] -translate-x-1/2 w-[850px] h-[350px] rounded-[100%] border-[20px] border-blue-400/10 blur-[30px]"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 10%, transparent 50%)",
            }}
          />

          {/* 3. The Core Arc - Using border-t and mask-image for a perfect curve */}
          <div
            className="absolute left-1/2 top-[20%] -translate-x-1/2 w-[1000px] h-[500px] rounded-[100%] border-t-[10px] blur-sm border-blue-300/60 border-blue-400 transition-opacity duration-1000"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 25%, black 75%, transparent 100%)",
              boxShadow: "0 -4px 20px -2px rgba(8, 106, 219, 0.3)",
            }}
          />

          <div
            className="absolute left-1/2 top-[19%] -translate-x-1/2 w-[400px] h-[100px] rounded-[100%]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(191, 219, 254, 0.4) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Soft light cast below the arc - OPTIMIZED GRADIENT */}
        <div
          className="absolute left-1/2 top-[30%] h-[20rem] w-[65rem] -translate-x-1/2 rounded-full mix-blend-screen opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.08) 30%, transparent 80%)",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 text-center md:px-6">
        {/* =========================================
            HERO CONTENT
            ========================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-20 transform-gpu will-change-transform" // <-- Added here
        >
          {/* Focal Light Behind Text */}
          {/* Focal Light Behind Text - OPTIMIZED GRADIENT */}
          <div
            className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full mix-blend-screen opacity-50"
            style={{
              background:
                "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 85%)",
            }}
          />

          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-xs font-medium tracking-wide text-blue-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)]" />
            NEXT GENERATION OF TRADING
          </span>

          <h1 className="mx-auto mb-6 max-w-4xl font-sans text-5npm ruxl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400 md:text-6xl lg:text-7xl">
            Trade Smarter with <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-sky-500">
              AI-Powered
            </span>{" "}
            Insights
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg tracking-wide text-slate-400 md:text-xl">
            Gemalgo combines artificial intelligence with cutting-edge trading
            strategies to help you maximize your investments with precision and
            ease.
          </p>

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row z-30 relative">
            {/* Primary Button */}
            <Link
              href="/docs/get-started"
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
            </Link>

            {/* Secondary Button */}
            <a
              href="#how-it-works"
              className="group flex w-full items-center justify-center rounded-full border border-slate-700 bg-transparent px-8 py-3.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:bg-slate-800/50 hover:text-white sm:w-auto"
            >
              Learn how it works
            </a>
          </div>
        </motion.div>

        {/* =========================================
            LAYER 4: FOREGROUND DASHBOARD (UI MATERIAL)
            ========================================= */}
      </div>
      {/*
       * Perspective must be on the PARENT of the element that rotates,
       * otherwise CSS perspective has no 3-D effect on the element itself.
       */}
      <div
        style={{ perspective: "2000px" }}
        className="relative z-10 mx-auto max-w-5xl px-4"
      >
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
          {/* Enhanced Top Glow for Dashboard - Spilling from the arc */}
          {/* TOP EDGE LIGHT (REFERENCE STYLE - BLUE) */}
          <div
            style={{ contain: "paint" }}
            className="pointer-events-none absolute -top-[2px] left-1/2 -translate-x-1/2 w-[92%] h-[2px]"
          >
            {/* Core light strip */}
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

            {/* Soft bloom */}
            <div
              className="absolute inset-0 blur-[12px]"
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

            {/* Wide atmospheric glow */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 w-[120%] h-[120px] blur-[50px]"
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

          {/* Light emission cast from the arc onto the top of the dashboard */}
          <div className="absolute -top-px left-1/2 -translate-x-1/2 w-4/5 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent opacity-90 shadow-[0_0_15px_rgba(147,197,253,0.5)]" />

          {/* Main Dashboard Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/70 p-2 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]">
            {/* Top Sheen Reflection on the glass */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-400/5 to-transparent pointer-events-none" />
            {/* Inner Dashboard Layout Mockup */}
            <div className="relative flex h-[500px] w-full flex-col rounded-xl border border-white/5 bg-[#0f172a]/50 overflow-hidden">
              {/* App Header */}
              <div className="flex h-14 items-center justify-between border-b border-white/5 px-6">
                <div className="flex gap-4">
                  <div className="h-3 w-16 rounded-full bg-slate-700/50" />
                  <div className="h-3 w-20 rounded-full bg-slate-700/50" />
                </div>
                <div className="h-6 w-6 rounded-full bg-blue-500/20 ring-1 ring-blue-500/40" />
              </div>

              {/* App Body Grid */}
              <div className="grid h-full grid-cols-12 gap-4 p-6">
                {/* Sidebar */}
                <div className="col-span-3 flex flex-col gap-3">
                  <div className="h-8 w-full rounded-lg bg-blue-500/10 border border-blue-500/20" />
                  <div className="h-8 w-full rounded-lg bg-white/5" />
                  <div className="h-8 w-full rounded-lg bg-white/5" />
                  <div className="h-8 w-full rounded-lg bg-white/5" />
                </div>

                {/* Main Content Area */}
                <div className="col-span-9 flex flex-col gap-4">
                  {/* Top Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 rounded-xl border border-white/5 bg-slate-800/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                      <div className="h-2 w-12 rounded-full bg-slate-600 mb-4" />
                      <div className="h-6 w-24 rounded-full bg-blue-400/80" />
                    </div>
                    <div className="h-24 rounded-xl border border-white/5 bg-slate-800/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                      <div className="h-2 w-12 rounded-full bg-slate-600 mb-4" />
                      <div className="h-6 w-20 rounded-full bg-slate-200" />
                    </div>
                    <div className="h-24 rounded-xl border border-white/5 bg-slate-800/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                      <div className="h-2 w-12 rounded-full bg-slate-600 mb-4" />
                      <div className="h-6 w-16 rounded-full bg-slate-200" />
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="relative flex-1 rounded-xl border border-white/5 bg-slate-800/20 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                    {/* Simulated Graph Line */}
                    <svg
                      className="absolute bottom-0 w-full h-[80%]"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <path
                        d="M0,100 L0,60 Q25,80 50,40 T100,20 L100,100 Z"
                        fill="url(#gradient)"
                        opacity="0.2"
                      />
                      <path
                        d="M0,60 Q25,80 50,40 T100,20"
                        fill="none"
                        stroke="#60a5fa"
                        strokeWidth="1"
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity="1"
                          />
                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
