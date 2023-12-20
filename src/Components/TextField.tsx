import React from "react";
import "./TextField.css";
interface TextFieldProps {
  type: string;
  placeholder?: string;
  suffixIcon?: React.ReactNode;
  name: string;
  label?: string;
  required?: boolean;
  width?: number;
}
const TextField = ({
  type,
  placeholder,
  suffixIcon,
  name,
  label,
  required,
  width,
}: TextFieldProps) => {
  return (
    <input
      className="textField "
      type={type}
      placeholder={placeholder}
      name={name}
      required={required}
      style={{ width: `${width}rem` }}
    />
  );
};

export default TextField;
