import React, { Dispatch, SetStateAction } from "react";
import style from "./SwitchBox.module.scss";
import Switch from "@/components/Atoms/Switch/Switch";

interface SwitchBoxProps {
  label: string;
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}

export default function SwitchBox(props: SwitchBoxProps) {
  const { label, value, setValue } = props;
  return (
    <div>
      <Switch active={value} setActive={setValue} />
    </div>
  );
}
