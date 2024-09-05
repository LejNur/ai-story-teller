import React, { Dispatch, SetStateAction, useEffect } from "react";
import style from "./Toast.module.scss";

interface ToastProps {
  title: string;
  message: string;
  setAction: Dispatch<SetStateAction<boolean>>;
}

export default function Toast(props: ToastProps) {
  const { title, message, setAction } = props;
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAction(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [setAction]);

  return (
    <div className={style.toast}>
      <div>
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
      <button className={style.close_btn} onClick={() => setAction(false)}>
        x
      </button>
      <div className={style.progressBar}>
        <div className={style.fill} />
      </div>
    </div>
  );
}
