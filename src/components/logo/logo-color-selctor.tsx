import { Select, SelectItem } from "@nextui-org/react";

import { colors } from "@/constants";

type LogoColorSelector = {
  onChangeValue: (style: string) => void;
};

const LogoColorSelector = ({ onChangeValue }: LogoColorSelector) => {
  return (
    <Select
      items={colors}
      label="Colors"
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
      onChange={(e) => {
        const value = e.target.value;

        const color = colors.find((color) => color.name === value);
        if (color?.name !== "Custom") {
          onChangeValue(color?.hex.join(",") as string);
        } else {
          onChangeValue("Custom");
        }
      }}
    >
      {(style) => (
        <SelectItem key={style.name} textValue={style.name}>
          <div className="flex space-x-2">
            <div className="flex h-[60px] w-[60px] rounded-md">
              <div
                className="block h-full w-[20px] rounded-bl-md rounded-tl-md"
                style={{ backgroundColor: style.hex[0] }}
              ></div>
              <div
                className="block h-full w-[20px]"
                style={{ backgroundColor: style.hex[1] }}
              ></div>
              <div
                className="block h-full w-[20px] rounded-br-md rounded-tr-md"
                style={{ backgroundColor: style.hex[2] }}
              ></div>
            </div>
            <div>
              <h1>{style.name}</h1>
              <p className="text-xs text-default-500">{style.psychology}</p>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
};

export default LogoColorSelector;
