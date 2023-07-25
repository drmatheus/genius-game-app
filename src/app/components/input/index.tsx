import { FieldError } from "react-hook-form";

type TPInput = {
  label: string;
  type: string | undefined;
  error?: FieldError | undefined;
  register: any;
  defaulfValue?: string;
  className?: string;
  registerName?: string;
  placeholder: string;
};

export function Input({
  label,
  type,
  error,
  register,
  defaulfValue,
  className,
  registerName,
  placeholder,
}: TPInput) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        defaultValue={defaulfValue}
        {...register(registerName)}
        placeholder={placeholder}
        className={`h-9 rounded -mt-1 mb-2 text-black text-sm p-2 ${className}`}
      />
      {error?.message && (
        <span className="text-xs -mt-5 bg-red-700 w-fit p-1 rounded-3xl ">
          *{error.message}
        </span>
      )}
    </>
  );
}
