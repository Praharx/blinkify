"use client";
import { useState } from "react";

interface IToggleSwitchProps {
  onChange?: (value: boolean) => void;
  defaultChecked?: boolean;
  toggleVal?: boolean;
  changeToggleVal?: (value: boolean) => void;
}

const ToggleSwitch = ({ onChange, defaultChecked, toggleVal, changeToggleVal }: IToggleSwitchProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultChecked ?? false);
  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange?.(newCheckedState);
  };

  return (
    <>
      <label  className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            onClick={() => changeToggleVal?.(!toggleVal)}

            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${isChecked ? "bg-muted" : "bg-muted"}`}
          />
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition ${
              isChecked ? "translate-x-full bg-zinc-800" : "bg-zinc-500"
            }`}
          />
        </div>
      </label>
    </>
  );
};

export default ToggleSwitch;
