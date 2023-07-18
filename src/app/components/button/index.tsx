import React from "react";

interface IPropsButton {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

export const Button = ({
  text,
  disabled,
  className,
  onClick,
  type,
}: IPropsButton) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded w-fit p-1 ${className}`}
      type={type}
    >
      {text}
    </button>
  );
};
