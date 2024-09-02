import Button from "@/components/Atoms/Button/Button";
import React from "react";
import style from "./Header.module.scss";

interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  const { title } = props;
  return (
    <div className={style.header_container}>
      <h1>{title}</h1>
      <Button label="Login" />
    </div>
  );
}
