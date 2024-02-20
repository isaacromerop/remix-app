type InputProps = {
  name: string;
  label: string;
  srOnly?: boolean;
  type?: HTMLInputElement["type"];
  required?: boolean;
};

const Input = ({
  label,
  name,
  srOnly = false,
  type = "text",
  required = false,
}: InputProps) => {
  return (
    <div className="flex flex-col max-w-56">
      <label htmlFor={name} className={`${srOnly ? "sr-only" : ""}`}>
        {label}
      </label>
      <input id={name} type={type} name={name} required={required} />
    </div>
  );
};

export { Input };
