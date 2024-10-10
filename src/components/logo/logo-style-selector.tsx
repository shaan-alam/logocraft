
import { Select, SelectItem } from "@nextui-org/react";

import { styles } from "@/constants";

type LogoStyleSelectorProps = {
  onChangeValue: (style: string) => void;
};

const LogoStyleSelector = ({ onChangeValue }: LogoStyleSelectorProps) => {
  return (
    <Select
      items={styles}
      label="Style"
      className="w-full"
      variant="flat"
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5",
        trigger: "min-h-16",
        listboxWrapper: "max-h-[400px] z-40",
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
      {(style) => (
        <SelectItem key={style.value} textValue={style.value}>
          <span>{style.label}</span>
        </SelectItem>
      )}
    </Select>
  );
};

export default LogoStyleSelector;
