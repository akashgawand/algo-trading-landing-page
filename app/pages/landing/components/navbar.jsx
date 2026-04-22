"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hover for magic highlight
  const menuRef = useRef(null);

  // Improved Scroll Logic: Direction stability + Hysteresis
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Ignore micro scrolls to prevent jitter
    if (Math.abs(diff) < 5) return;

    if (diff > 0 && latest > 120 && !mobileMenuOpen) {
      setHidden(true);
    } else if (diff < 0 || mobileMenuOpen) {
      setHidden(false);
    }

    // Background threshold
    setIsScrolled(latest > 50);
  });

  // Handle outside click for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Strategies", href: "#strategies" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 z-[40] md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
        // Changed from spring to a custom smooth ease for a more premium structural feel
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-4",
          isScrolled
            ? "bg-[#0a0613]/80 shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="w-full mx-auto px-5 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group relative z-50">
            <span className="text-white font-bold text-xl tracking-tight">
              Gem<span className="text-blue-500">algo</span>
            </span>
          </Link>

          {/* Desktop Nav - With Magic Highlight */}
          <div className="hidden md:flex pl-34 items-center gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                {link.name}
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4 relative z-50">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild variant="ghost" className="text-white hover:bg-white/5 hover:text-white transition-colors">
                <Link href="/dashboard?strategy=nikolai&account=0">
                  Dashboard
                </Link>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-6 shadow-lg shadow-blue-500/20 group transition-all duration-300">
                <Link href="https://go.gemalgo.ai/video-1" target="_blank" rel="noopener noreferrer">
                  Get Started
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0a0613]/98 border-l border-white/10 shadow-2xl flex flex-col z-50 md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
               <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-white font-bold text-xl tracking-tight">
                  Gem<span className="text-blue-500">algo</span>
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 px-5 py-8 flex flex-col gap-8 overflow-y-auto">
              {/* Navigation Section */}
              <div className="flex flex-col gap-8">
                <p className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-2 px-1">Navigation</p>
                <div className="flex flex-col gap-5">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + (idx * 0.05),
                        type: "spring",
                        stiffness: 300,
                        damping: 24
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-2xl font-bold text-white hover:text-blue-500 transition-colors block tracking-tight"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/5 mx-1" />

              {/* Account Section */}
              <div className="flex flex-col gap-8">
                <p className="text-[11px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-2 px-1">Account</p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <Link 
                    href="/dashboard?strategy=nikolai&account=0" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xl font-bold text-white hover:text-white transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white w-full h-12 text-lg font-bold rounded-[2rem] shadow-xl shadow-blue-500/20 group mt-2">
                    <Link href="https://go.gemalgo.ai/video-1" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full">
                      Get Started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;