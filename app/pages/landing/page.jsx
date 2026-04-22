import Navbar from "./components/navbar";
import HeroSaaS from "@/app/pages/landing/components/hero";
import FeaturesSection from "./components/featuresSection";
import { Strategies } from "./components/strategies";
import TestimonialsGrid from "./components/testimonialsGrid.jsx";
import AboutGemalgo from "./components/about.jsx";
import AISpokespersonWidget from "./components/AISpokespersonWidget";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0613] relative">
      <Navbar />
      <HeroSaaS />
      <Strategies />
      <FeaturesSection />
      <TestimonialsGrid />
      <AboutGemalgo />
      {/* Additional sections can be added here */}
      
      {/* Sticky Bottom Right AI Spokesperson */}
      <AISpokespersonWidget />
    </main>
  );
}
  