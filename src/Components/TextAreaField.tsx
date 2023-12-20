import "./TextAreaField.css";

interface TextAreaFieldProps {
  placeholder?: string;
  name: string;
  label?: string;
  height?: number;
  width?: number;
  require?: boolean;
}

const TextAreaField = ({
  placeholder,
  name,
  label,
  height,
  width,
  require,
}: TextAreaFieldProps) => {
  return (
    <div className="textArea">
      <label htmlFor={name}>{label}</label>
      <div className="textAreaDiv">
        <textarea
          name={name}
          id=""
          cols={width ? width : 30}
          rows={height ? height : 10}
          placeholder={placeholder}
          required={require}
        ></textarea>
      </div>
    </div>
  );
};

export default TextAreaField;
