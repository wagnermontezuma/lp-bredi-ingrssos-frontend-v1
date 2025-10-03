"use client";

import { useSearchParams } from "next/navigation";

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import EventTypes from "@/components/sections/EventTypes";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import SocialProof from "@/components/sections/SocialProof";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";
import TestimonialsDebugCard from "@/components/TestimonialsDebugCard";
import ApprovedByUsersFix from "@/components/ApprovedByUsersFix";

export default function Page() {
  const search = useSearchParams();
  const showDebug =
    process.env.NEXT_PUBLIC_DEBUG_UI === "1" ||
    search.get("debug") === "testimonials";

  return (
    <div className="bg-bredi-bg text-bredi-neutral">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <EventTypes />
        <SocialProof />
        <Pricing />
        <Features />
        <FinalCTA />
      </main>
      <Footer />
      {showDebug ? <TestimonialsDebugCard /> : null}
      <ApprovedByUsersFix />
    </div>
  );
}
