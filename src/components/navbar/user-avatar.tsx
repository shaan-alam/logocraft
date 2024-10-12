import Image from "next/image";
import Link from "next/link";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { KindeUserBase } from "@kinde-oss/kinde-auth-nextjs/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { IconLogout, IconPhotoAi } from "@tabler/icons-react";

import { useUser } from "@/hooks/use-user";

type UserAvatarProps = {
  user: KindeUserBase;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  const { isLoading, data: userData } = useUser(user.id);

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-[40px] w-[40px] rounded-full" />
      </div>
    );
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Image
          src={user?.picture as string}
          height={40}
          width={40}
          alt={user.given_name as string}
          className="cursor-pointer rounded-full ring-2 ring-primary ring-offset-2"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions">
        <DropdownItem key="new">
          <Link href={`/user/${userData?.id}`}>
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
