import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import LandingPage from "@/components/landing-page";

import { db } from "@/db";

export default async function Home() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) return <LandingPage />;

  const existingUser = await db.user.findFirst({
    where: {
      kindeUserId: user.id,
    },
  });

  if (!existingUser && user) {
    await db.user.create({
      data: {
        kindeUserId: user?.id,
        name: user?.given_name as string,
        picture: user?.picture as string,
      },
    });
  }

  return <LandingPage />;
}
