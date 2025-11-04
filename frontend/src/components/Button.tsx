import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // for optional extra Tailwind classes
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className = "",
}) => {
  const baseStyles =
    "rounded-2xl font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  let variantStyles = "";
  if (variant === "primary")
    variantStyles = `
      bg-primary
      text-bg 
      hover:bg-primary/90 
      active:bg-secondary active:text-primary 
      focus:ring-primary
   `;
  else if (variant === "secondary")
    variantStyles = `
      bg-secondary
      text-primary 
      hover:bg-secondary/90 
      focus:ring-secondary
   `;
  else if (variant === "outline")
    variantStyles =
      `border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary`;

  let sizeStyles = "";
  if (size === "sm") sizeStyles = "px-3 py-1 text-sm";
  else if (size === "md") sizeStyles = "px-4 py-2 text-base";
  else if (size === "lg") sizeStyles = "px-6 py-3 text-lg";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
