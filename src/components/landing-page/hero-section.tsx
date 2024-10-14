"use client";

import Link from "next/link";

import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Player } from "video-react";
import "video-react/styles/scss/video-react.scss";

import WordPullUp from "../ui/word-pull-up";

const HeroSection = () => {
  const { isAuthenticated } = useKindeBrowserClient();

  return (
    <main className="container mx-auto flex flex-col px-4 py-8 md:py-12 lg:h-auto lg:flex-col lg:items-center lg:justify-between lg:space-x-12 lg:py-16">
      <div className="mb-8 w-full lg:mb-0 lg:w-1/2">
        <WordPullUp
          words="Design Stunning Logos Instantly with AI"
          className="mb-4 text-center text-3xl leading-7 md:text-4xl lg:text-5xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.4, delay: 1.5 }}
          className="mb-6 text-center text-sm font-normal text-default-500 md:text-base"
        >
          Let AI bring your brand to life with a custom logo, fast and
          hassle-free. Say goodbye to costly, time-intensive design processes!
        </motion.p>
        <motion.ul
          className="mb-6 space-y-2"
          initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
          transition={{ duration: 0.4, delay: 2 }}
        >
          <li className="text-muted-foreground flex items-start justify-center text-center text-sm md:text-base">
            <span className="mr-2">✨</span> Describe your logo vision, get it
            instantly
          </li>
          <li className="text-muted-foreground flex items-start justify-center text-center text-sm md:text-base">
            <span className="mr-2">🎨</span> Craft one-of-a-kind logos for your
            brand
          </li>
          <li className="text-muted-foreground flex items-start justify-center text-center text-sm md:text-base">
            <span className="mr-2">🎯</span> Choose from 10+ unique styles and
            vibrant color schemes
          </li>
          <li className="text-muted-foreground flex items-start justify-center text-center text-sm md:text-base">
            <span className="mr-2">🌟</span> Easily extract and apply your
            logo&apos;s color palette
          </li>
          <li className="text-muted-foreground flex items-start justify-center text-center text-sm md:text-base">
            <span className="mr-2">🚀</span> Enjoy free logo generation for
            now—pricing will be introduced soon!
          </li>
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, x: -20, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
          transition={{ duration: 0.4, delay: 2.2 }}
          className="my-12 flex justify-center"
        >
          {!isAuthenticated ? (
            <LoginLink>
              <Button
                variant="shadow"
                color="primary"
                disableRipple
                className="mx-auto w-full sm:w-auto"
              >
                Start Creating
              </Button>
            </LoginLink>
          ) : (
            <Link href="/logo/new">
              <Button color="primary" disableRipple>
                <IconPlus className="h-4 w-4" />
                <span className="hidden sm:block">Create New Logo</span>
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
      <div className="w-full lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0)" }}
          transition={{ duration: 0.4, delay: 2.5 }}
        >
          <Player
            src="https://utfs.io/f/4HrWTRZRvKfTywDmxrluea5qw0p1nU82diECQ36vfLrKtTkW"
            poster="https://utfs.io/f/4HrWTRZRvKfTvCjFd3020XYgS7jkN8zTsJGcpnOF9KqLexaE"
          />
        </motion.div>
      </div>
    </main>
  );
};

export default HeroSection;
