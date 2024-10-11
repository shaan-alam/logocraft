import { redirect } from "next/navigation";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import LogoGenerator from "@/components/logo/logo-generator";

export default async function DashboardPage() {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/");
  }
  return (
    <div className="h-auto">
      <LogoGenerator />
    </div>
  );
}
