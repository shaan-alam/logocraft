"use client";

import FAQ from "./faq";
import HeroSection from "./hero-section";
import LogoPricingSection from "./pricing-section";
import WallOfLogos from "./wall-of-logos";

export default function LandingPage() {
  return (
    <>
      <div className="background">
        <div></div>
        <div></div>
      </div>
      <HeroSection />
      <WallOfLogos />
      <LogoPricingSection />
      <FAQ />
    </>
  );
}
