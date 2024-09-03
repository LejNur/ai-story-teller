import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface ListOptions {
  label: string;
  value: string | number;
}

interface SelectBoxProps {
  label: string;
  list: ListOptions[];
  setAction?: Dispatch<SetStateAction<string>>;
}

export default function SelectBox(props: SelectBoxProps) {
  const { label, list } = props;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  return (
    <div>
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
