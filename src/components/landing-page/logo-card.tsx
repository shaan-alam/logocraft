import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { Logo, User } from "@prisma/client";
import { IconDownload } from "@tabler/icons-react";

import { downloadLogo } from "@/lib/download-logo";

type LogoCardProps = {
  logo: Logo & { user: User };
};

const LogoCard = ({ logo }: LogoCardProps) => {
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image alt={logo.name} className="object-cover" src={logo.logoURLs[0]} />
      <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-default-200">Created by</span>
          <Image
            alt={logo.user.name}
            className="object-cover"
            height={30}
            src={logo.user.picture}
            width={30}
          />
          <span className="text-sm text-default-200">{logo.user.name}</span>
        </div>

        <Button
          className="ml-auto bg-black/20 text-tiny text-white"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          disableRipple
          onClick={() =>
            downloadLogo(logo.logoURLs[0], `${logo.name}-Logo.png`)
          }
        >
          <IconDownload className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LogoCard;
