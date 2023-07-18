import { FieldError } from "react-hook-form";

type TPInput = {
  label: string;
  type: string;
  error?: FieldError | undefined;
  register: any;
  defaulfValue?: string;
  className?: string;
  registerName?: string;
};

export function Input({
  label,
  type,
  error,
  register,
  defaulfValue,
  className,
  registerName,
}: TPInput) {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        defaultValue={defaulfValue}
        {...register(registerName)}
        className={`h-9 rounded -mt-1 mb-2 text-black text-sm p-2 ${className}`}
      />
      {error?.message && <span>{error.message}</span>}
    </>
  );
}
