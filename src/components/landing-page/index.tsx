"use client";

// import { Player } from "video-react";
import "video-react/styles/scss/video-react.scss";

import { ArcadeEmbed } from "../arcade-demo";
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
      <div className="container mx-auto my-40">
        <h1 className="mb-12 text-center text-3xl leading-7 md:text-4xl lg:text-5xl">
          Watch the Demo
        </h1>
        <div className="mx-auto h-auto w-auto rounded-lg border-[10px] border-default-200 ">
          <ArcadeEmbed />
          {/* <Player
            height={400}
            width={400}
            src="https://utfs.io/f/4HrWTRZRvKfTywDmxrluea5qw0p1nU82diECQ36vfLrKtTkW"
            poster="https://utfs.io/f/4HrWTRZRvKfTvCjFd3020XYgS7jkN8zTsJGcpnOF9KqLexaE"
          /> */}
        </div>
      </div>
      <WallOfLogos />
      <LogoPricingSection />
      <FAQ />
    </>
  );
}
