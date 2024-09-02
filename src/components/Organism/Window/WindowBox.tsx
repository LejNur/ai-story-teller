import React from "react";
import style from "./WindowBox.module.scss";

interface WindowProps {
  title?: string;
}

export default function WindowBox(props: WindowProps) {
  const { title } = props;
  return <div className={style.window_box}>{title && <h2>{title}</h2>}</div>;
}
