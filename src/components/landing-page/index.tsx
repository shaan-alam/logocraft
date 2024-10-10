"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@nextui-org/react";
import { Player } from "video-react";
import "video-react/styles/scss/video-react.scss";

import WallOfLogos from "./wall-of-logos";

export default function LandingPage() {
  return (
    <>
      <main className="container mx-auto flex h-[90vh] w-full flex-grow items-center justify-center space-x-12 bg-white">
        <div className="w-1/2">
          <h1 className="text-4xl font-semibold">
            Design Stunning Logos Instantly with AI
          </h1>
          <p className="mb-8 mt-1 text-base text-default-500">
            Let AI bring your brand to life with a custom logo, fast and
            hassle-free. Say goodbye to costly, time-intensive design processes!
          </p>

          <ul>
            <li className="mb-1 text-default-600">
              ✨ Describe your logo vision, get it instantly
            </li>
            <li className="mb-1 text-default-600">
              🎨 Craft one-of-a-kind logos for your brand
            </li>
            <li className="mb-1 text-default-600">
              🎯 Choose from 10+ unique styles and vibrant color schemes
            </li>
            <li className="mb-1 text-default-600">
              🌟 Easily extract and apply your logo&apos;s color palette
            </li>
            <li className="mb-4 text-default-600">
              🚀 Enjoy free logo generation for now—pricing will be introduced
              soon!
            </li>
          </ul>
          <LoginLink>
            <Button variant="shadow" color="primary" disableRipple>
              Start Creating
            </Button>
          </LoginLink>
        </div>
        <div className="flex h-full w-1/2 items-center">
          <Player
            src="https://utfs.io/f/4HrWTRZRvKfTywDmxrluea5qw0p1nU82diECQ36vfLrKtTkW"
            poster="https://utfs.io/f/4HrWTRZRvKfTvCjFd3020XYgS7jkN8zTsJGcpnOF9KqLexaE"
          />
        </div>
      </main>
      <WallOfLogos />
    </>
  );
}
