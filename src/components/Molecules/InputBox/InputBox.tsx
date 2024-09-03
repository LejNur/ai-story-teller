import React, { Dispatch, SetStateAction, useState } from "react";
import style from "./InputBox.module.scss";

interface InputBoxProps {
  label: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

export default function InputBox(props: InputBoxProps) {
  const { label, value, setValue } = props;

  return (
    <div className={style.inputBox}>
      <h3>{label}</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
