"use client";

import { useState } from "react";

import { Button, Input } from "@nextui-org/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";

interface CounterProps {
  initialValue?: number;
  min?: number;
  step?: number;
  onChangeNumber: (number: number) => void;
}

const LogoCounter = ({
  initialValue = 1,
  min = 1,
  step = 1,
  onChangeNumber,
}: CounterProps) => {
  const [value, setValue] = useState(initialValue);
  const max = 3;

  const handleIncrement = () => {
    setValue((prevValue) => Math.min(prevValue + step, max));
    onChangeNumber(Math.min(value + step, max));
  };

  const handleDecrement = () => {
    setValue((prevValue) => Math.max(prevValue - step, min));
    onChangeNumber(Math.max(value - step, min));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(Math.max(min, Math.min(newValue, max)));
    }
  };

  return (
    <>
      <h1 className="mb-2 text-default-600">Number of Logos: </h1>
      <div className="flex items-center space-x-2">
        <Button
          isIconOnly
          variant="flat"
          onPress={handleDecrement}
          isDisabled={value <= min}
          className="rounded-full"
          disableRipple
        >
          <IconMinus size={18} />
        </Button>
        <Input
          value={value.toString()}
          onChange={handleChange}
          className="w-20 text-center"
          classNames={{
            input: "text-center",
            inputWrapper: "border-1",
          }}
        />
        <Button
          isIconOnly
          variant="flat"
          onPress={handleIncrement}
          isDisabled={value >= max}
          className="rounded-full"
          disableRipple
        >
          <IconPlus size={18} />
        </Button>
      </div>
    </>
  );
};

export default LogoCounter;
