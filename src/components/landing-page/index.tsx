"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@nextui-org/react";
import { Player } from "video-react";
import "video-react/styles/scss/video-react.scss";

import Footer from "./footer";
import WallOfLogos from "./wall-of-logos";

export default function LandingPage() {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <>
      <main className="container mx-auto flex flex-col bg-white px-4 py-8 md:py-12 lg:flex-row lg:items-center lg:justify-between lg:space-x-12 lg:py-16 lg:h-[90vh]">
        <div className="mb-8 w-full lg:mb-0 lg:w-1/2">
          <h1 className="mb-4 text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
            Design Stunning Logos Instantly with AI
          </h1>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Let AI bring your brand to life with a custom logo, fast and
            hassle-free. Say goodbye to costly, time-intensive design processes!
          </p>

          <ul className="mb-6 space-y-2">
            <li className="text-muted-foreground flex items-start text-sm md:text-base">
              <span className="mr-2">✨</span> Describe your logo vision, get it
              instantly
            </li>
            <li className="text-muted-foreground flex items-start text-sm md:text-base">
              <span className="mr-2">🎨</span> Craft one-of-a-kind logos for
              your brand
            </li>
            <li className="text-muted-foreground flex items-start text-sm md:text-base">
              <span className="mr-2">🎯</span> Choose from 10+ unique styles and
              vibrant color schemes
            </li>
            <li className="text-muted-foreground flex items-start text-sm md:text-base">
              <span className="mr-2">🌟</span> Easily extract and apply your
              logo&apos;s color palette
            </li>
            <li className="text-muted-foreground flex items-start text-sm md:text-base">
              <span className="mr-2">🚀</span> Enjoy free logo generation for
              now—pricing will be introduced soon!
            </li>
          </ul>

          {!isAuthenticated && (
            <LoginLink>
              <Button
                variant="shadow"
                color="primary"
                disableRipple
                className="w-full sm:w-auto"
              >
                Start Creating
              </Button>
            </LoginLink>
          )}
        </div>
        <div className="w-full lg:w-1/2">
          <Player
            src="https://utfs.io/f/4HrWTRZRvKfTywDmxrluea5qw0p1nU82diECQ36vfLrKtTkW"
            poster="https://utfs.io/f/4HrWTRZRvKfTvCjFd3020XYgS7jkN8zTsJGcpnOF9KqLexaE"
          />
        </div>
      </main>
      <WallOfLogos />
      <Footer />
    </>
  );
}
