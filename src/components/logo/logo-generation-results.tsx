"use client";

import { Logo } from "@prisma/client";

import GeneratedLogo from "./generated-logo";

type LogoGenerationResultsProps = {
  logo: Logo;
};

const LogoGenerationResults = ({ logo }: LogoGenerationResultsProps) => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-center text-xl font-semibold md:text-2xl">
        Generated Logos
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {logo.logoURLs.map((url, index) => (
          <GeneratedLogo
            key={`${url}-${index}`}
            logoURL={url}
            name={logo.name}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoGenerationResults;
