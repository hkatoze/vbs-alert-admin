import "./SelectField.css";
interface SelectFieldProps {
  name: string;
  label?: string;
  options: string[];
  required?: boolean;
  width?: number;
}

const SelectField = ({
  name,
  label,
  required,
  options,
  width,
}: SelectFieldProps) => {
  return (
    <div className="selectField flex">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id=""
        required={required}
        style={{ width: `${width}rem` }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
