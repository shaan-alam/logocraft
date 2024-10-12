"use client";

import GeneratedLogo from "./generated-logo";

type LogoGenerationResultsProps = {
  logos: {
    key: number;
    imageURL: string;
  }[];
  name: string;
};

const LogoGenerationResults = ({ logos, name }: LogoGenerationResultsProps) => {
  return (
    <div className="w-full">
      <h2 className="mb-4 text-center text-xl font-semibold md:text-2xl">
        Generated Logos
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {logos.map((logo, index) => (
          <GeneratedLogo
            key={`${logo.imageURL}-${index}`}
            logo={logo}
            isSaved={false}
            name={name}
          />
        ))}
      </div>
    </div>
  );
};

export default LogoGenerationResults;
