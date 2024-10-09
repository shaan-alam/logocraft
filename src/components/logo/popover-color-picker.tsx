import React, { useCallback, useRef, useState } from "react";

import { HexColorPicker } from "react-colorful";

import useClickOutside from "@/hooks/use-click-outside";

interface PopoverPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export const PopoverPicker: React.FC<PopoverPickerProps> = ({
  color,
  onChange,
}) => {
  const popover = useRef<HTMLDivElement | null>(null);
  const [isOpen, toggle] = useState<boolean>(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker">
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
