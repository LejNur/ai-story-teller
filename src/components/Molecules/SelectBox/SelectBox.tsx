import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import style from "./SelectBox.module.scss";

interface ListOption {
  label: string;
  value: string | number;
}

interface SelectBoxProps {
  label: string;
  list: ListOption[];
  setAction: Dispatch<SetStateAction<string>>;
}

export default function SelectBox(props: SelectBoxProps) {
  const { label, list, setAction } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAction(e.target.value);
  };

  return (
    <div className={style.selectBox}>
      <h3>{label}</h3>
      <select onChange={handleChange}>
        <option value="" hidden>
          Select
        </option>
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
