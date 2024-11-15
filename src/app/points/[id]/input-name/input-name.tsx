// FormControl.tsx
import React, { FC } from "react";
import styles from "./input-name.module.css";

interface FormControlProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputName: FC<FormControlProps> = ({ label, value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.formControl}>
      <input
        type="text"
        required
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
      <label className={styles.label}>
        {label.split("").map((char, index) => (
          <span
            key={index}
            className={styles.labelSpan}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {char}
          </span>
        ))}
      </label>
    </div>
  );
};

export default InputName;
