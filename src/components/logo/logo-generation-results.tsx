"use client";


import { Logo } from "@prisma/client";
import "react-multi-carousel/lib/styles.css";

import GeneratedLogo from "./generated-logo";

type LogoGenerationResultsProps = {
  logo: Logo;
};

const LogoGenerationResults = ({ logo }: LogoGenerationResultsProps) => {
  return (
    <>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {logo.logoURLs.map((url) => (
          <GeneratedLogo logoURL={url} name={logo.name} />
        ))}
      </div>
    </>
  );
};

export default LogoGenerationResults;
