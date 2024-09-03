import React, { ReactNode } from "react";
import style from "./WindowBox.module.scss";

interface WindowProps {
  title?: string;
  children: ReactNode;
}

export default function WindowBox(props: WindowProps) {
  const { title, children } = props;
  return (
    <div className={style.window_box}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}
