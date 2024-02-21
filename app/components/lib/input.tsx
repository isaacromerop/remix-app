type InputProps = {
  name: string;
  label: string;
  srOnly?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "label">;

const Input = ({ label, name, srOnly = false, ...inputProps }: InputProps) => {
  return (
    <div className="flex flex-col max-w-56">
      <label htmlFor={name} className={`${srOnly ? "sr-only" : ""}`}>
        {label}
      </label>
      <input id={name} name={name} {...inputProps} />
    </div>
  );
};

export { Input };
