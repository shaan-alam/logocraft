import { PropsWithChildren } from "react";

import Navbar from "@/components/navbar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </>
  );
};

export default DashboardLayout;
