import React from "react";

interface TextInputProps {
  label: string;
  value: string | number;
  type?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
}

export const TextInput = ({
  label,
  value,
  type,
  required,
  onChange,
  error,
  errorMessage,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="mb-2 block font-medium text-text">
        {label}
      </label>
      <input
        type={type ? type : "text"}
        id={label}
        placeholder={required ? `${label} *` : `${label}`}
        required={required}
        value={value}
        onChange={onChange}
        className={`${
          error && "border-red-500 placeholder:text-red-500 focus:ring-red-500"
        }`}
      />
      {error && <p className="absolute text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
};
