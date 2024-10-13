"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Skeleton,
} from "@nextui-org/react";

import { useUser } from "@/hooks/use-user";

import BuyCreditsButton from "./buy-credits-button";
import UserAvatar from "./user-avatar";

const NavbarComponent = () => {
  const { data: user, isLoading } = useUser();

  return (
    <Navbar className="mx-auto bg-white p-2" maxWidth="full">
      <div className="container mx-auto flex items-center">
        <NavbarBrand>
          <Link href="/" className="hidden md:block">
            <Image
              src="/logocraft.png"
              height={100}
              width={200}
              alt="LogoCraft"
            />
          </Link>
          <Link href="/" className="block md:hidden">
            <Image
              src="/logocraft-small.png"
              height={50}
              width={50}
              alt="LogoCraft"
            />
          </Link>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
            >
              {user?.credits} Credit
              {user?.credits && user?.credits > 1 ? "s" : ""} left
            </Chip>
          </NavbarItem>
          <NavbarItem>
            <BuyCreditsButton />
          </NavbarItem>
          <NavbarItem>
            {isLoading && (
              <div>
                <Skeleton className="h-[40px] w-[40px] rounded-full" />
              </div>
            )}
            {user && <UserAvatar user={user} />}
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
