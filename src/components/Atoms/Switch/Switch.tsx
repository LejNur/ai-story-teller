import React, { Dispatch, SetStateAction, useState } from "react";
import style from "./Switch.module.scss";

interface SwitchProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

export default function Switch(props: SwitchProps) {
  const { active, setActive } = props;

  return (
    <div
      className={`${style.switch_container} ${active ? style.active : ""}`}
      onClick={() => setActive(!active)}
    >
      <div className={`${style.switcher} ${active ? style.active : ""}`} />
    </div>
  );
}
