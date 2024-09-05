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
    <div className={style.switch_box}>
      <Switch active={value} setActive={setValue} />
      <h4>{label}</h4>
    </div>
  );
}
