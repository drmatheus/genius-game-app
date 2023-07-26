import React from "react";

interface IPropsButton {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  text,
  disabled,
  className,
  onClick,
}: IPropsButton) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded w-fit p-1 text-white ${className}`}
    >
      {text}
    </button>
  );
};
