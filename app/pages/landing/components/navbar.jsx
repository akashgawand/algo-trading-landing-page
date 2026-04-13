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

    if (diff > 0 && latest > 120) {
      setHidden(true);
    } else if (diff < 0) {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        // Changed from spring to a custom smooth ease for a more premium structural feel
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300 py-4",
          isScrolled
            ? "bg-[#0a0613]/80 backdrop-blur-xl shadow-2xl shadow-black/20"
            : "bg-transparent"
        )}
      >
        <div className="w-full mx-auto px-6 flex items-center justify-between">
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-0 right-0 bg-[#0a0613]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl overflow-hidden md:hidden z-40"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + (idx * 0.05), // Smoother stagger
                      type: "spring",
                      stiffness: 300,
                      damping: 24
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-semibold text-white/80 hover:text-white transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <div className="h-px bg-white/5 my-2" />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <Button asChild variant="outline" className="text-white border-white/10 hover:bg-white/5 w-full h-12 text-lg">
                    <Link href="/dashboard?strategy=nikolai&account=0">
                      Dashboard
                    </Link>
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white w-full h-12 text-lg rounded-xl shadow-lg shadow-blue-500/20">
                    Get Started
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;