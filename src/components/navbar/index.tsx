"use client";

import Image from "next/image";
import Link from "next/link";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";

import UserAvatar from "./user-avatar";

const NavbarComponent = () => {
  const data = useKindeBrowserClient();

  return (
    <Navbar className="mx-auto bg-white p-2" maxWidth="full">
      <div className="container mx-auto flex items-center">
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/logocraft.png"
              height={100}
              width={200}
              alt="LogoCraft"
            />
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            {data.user && (
              <Link href="/logo/new">
                <Button color="primary" disableRipple>
                  <IconPlus className="h-4 w-4" />
                  Create New Logo
                </Button>
              </Link>
            )}
          </NavbarItem>
          <NavbarItem>
            {data?.user && <UserAvatar user={data.user} />}
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
