import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import UserProfile from "@/components/user-profile";

import { db } from "@/db";

type UserProfilePageProps = {
  params: {
    id: string;
  };
};

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { id } = params;
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  const { getUser } = await getKindeServerSession();
  const kindeUser = await getUser();

  if (user && user.kindeUserId === kindeUser?.id) {
    return <UserProfile userId={user.id} />;
  } else {
    redirect("/");
  }
}
