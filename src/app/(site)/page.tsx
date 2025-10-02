import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import EventTypes from "@/components/sections/EventTypes";
import HowItWorks from "@/components/sections/HowItWorks";
import Benefits from "@/components/sections/Benefits";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import SocialProof from "@/components/sections/SocialProof";
import TestimonialsMetricsSection from "@/components/TestimonialsMetricsSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <div className="bg-bredi-bg text-bredi-neutral">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <EventTypes />
        <SocialProof />
        <TestimonialsMetricsSection />
        <Pricing />
        <Features />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
