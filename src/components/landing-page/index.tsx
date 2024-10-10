"use client";

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@nextui-org/react";
import { Player } from "video-react";
import "video-react/styles/scss/video-react.scss";

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

          <LoginLink>
            <Button variant="shadow" color="primary" disableRipple>
              Start Creating
            </Button>
          </LoginLink>
        </div>
        <div className="flex h-full w-1/2 items-center">
          <Player
            src="https://utfs.io/f/4HrWTRZRvKfTYonh0w3yRK7IoaJmUPlSqnVfiZt2dFgHBpwz"
            poster="https://utfs.io/f/4HrWTRZRvKfTvCjFd3020XYgS7jkN8zTsJGcpnOF9KqLexaE"
          />
        </div>
      </main>
    </>
  );
}
