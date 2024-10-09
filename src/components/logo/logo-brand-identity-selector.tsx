import Image from "next/image";

import { Select, SelectItem } from "@nextui-org/react";

import { brand_identities } from "@/constants";

type LogoBrandIdentitySelector = {
  onChangeValue: (style: string) => void;
};

const LogoBrandIdentitySelector = ({ onChangeValue }: LogoBrandIdentitySelector) => {
  return (
    <Select
      items={brand_identities}
      label="Brand Identity"
      className="w-full"
      variant="flat"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5",
        trigger: "min-h-16",
        listboxWrapper: "max-h-[400px]",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: "before:bg-default-200",
          content: "p-0 border-small border-divider bg-white",
        },
      }}
      onChange={(e) => onChangeValue(e.target.value)}
    >
      {(identity) => (
        <SelectItem key={identity.style} textValue={identity.style}>
          <div className="flex items-center space-x-3">
            <Image
              height={75}
              width={75}
              src={identity.image}
              alt={identity.style}
              className="rounded-md"
            />
            <div className="flex flex-col">
              <span>{identity.style}</span>
              <p className="text-tiny text-default-500">
                {identity.description}
              </p>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default LogoBrandIdentitySelector;
