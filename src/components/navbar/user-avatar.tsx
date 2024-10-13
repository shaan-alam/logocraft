import Image from "next/image";
import Link from "next/link";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { User } from "@prisma/client";
import { IconLogout, IconPhotoAi } from "@tabler/icons-react";

type UserAvatarProps = {
  user: User;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Image
          src={user?.picture as string}
          height={40}
          width={40}
          alt={user.name}
          className="cursor-pointer rounded-full ring-2 ring-primary ring-offset-2"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions">
        <DropdownItem key="new">
          <Link href={`/user/${user.id}`}>
            <div className="flex items-center space-x-2">
              <IconPhotoAi className="h-4 w-4" />
              <span>My Logos</span>
            </div>
          </Link>
        </DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          <LogoutLink>
            <div className="flex items-center space-x-2">
              <IconLogout className="h-4 w-4" />
              <span>Sign Out</span>
            </div>
          </LogoutLink>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserAvatar;
