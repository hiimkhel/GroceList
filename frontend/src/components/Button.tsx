import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // for optional extra Tailwind classes
  icon?: string; // optional icon/image URL
  iconPosition?: "left" | "right"; // position of the icon
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className = "",
  icon,
  iconPosition = "left",
}) => {
  const baseStyles =
    "rounded-xl font-semibold transition-colors duration-300 focus:outline-none";

  let variantStyles = "";
  if (variant === "primary")
    variantStyles = `
      border border-primary
      bg-primary
      text-bg 
      cursor-pointer
      hover:bg-[#041D26]
      active:bg-secondary active:text-primary active:border-secondary
   `;
  else if (variant === "secondary")
    variantStyles = `
      border border-secondary
      bg-secondary
      text-primary 
      cursor-pointer
      hover:bg-secondary/70 
      active:bg-primary active:text-bg active:border-primary
   `;
  else if (variant === "outline")
    variantStyles = `border border-primary text-primary cursor-pointer 
      hover:bg-primary hover:text-white 
      active:bg-secondary active:text-primary 
      active:border-secondary
      `;

  let sizeStyles = "";
  if (size === "sm") sizeStyles = "px-3 py-1 text-sm";
  else if (size === "md") sizeStyles = "px-4 py-2 text-base";
  else if (size === "lg") sizeStyles = "px-6 py-3 text-lg";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
    >
      {icon && iconPosition === "left" && (
        <img src={icon} alt="" className="h-4 w-4" />
      )}
      {children}
      {icon && iconPosition === "right" && (
        <img src={icon} alt="" className="h-4 w-4" />
      )}
    </button>
  );
};

export default Button;
