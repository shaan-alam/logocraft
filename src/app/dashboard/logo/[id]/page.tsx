import LogoGenerator from "@/components/logo/logo-generator";

import { db } from "@/db";

type LogoPageProps = {
  params: {
    id: string;
  };
};

const LogoPage = async ({ params }: LogoPageProps) => {
  const { id } = params;

  const logo = await db.logo.findUnique({
    where: {
      id,
    },
  });

  return (
    <div className="py-12">
      {logo && (
        <div>
          <LogoGenerator />
        </div>
      )}
    </div>
  );
};

export default LogoPage;
