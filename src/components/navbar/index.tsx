"use client";

import Image from "next/image";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default function App() {
  const data = useKindeBrowserClient();

  return (
    <Navbar className="mx-auto bg-white p-2" maxWidth="full">
      <div className="container mx-auto flex items-center">
        <NavbarBrand>
          <Image
            src="/logocraft.png"
            height={100}
            width={300}
            alt="LogoCraft"
          />
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button color="primary">Create Logo</Button>
          </NavbarItem>
          <NavbarItem>
            {data?.user?.picture && (
              <Image
                src={data.user?.picture ?? "/logocraft.png"}
                height={40}
                width={40}
                alt={data.user.given_name as string}
                className="rounded-full ring-2 ring-primary ring-offset-2"
              />
            )}
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
