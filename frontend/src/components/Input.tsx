import React from "react";

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: string; // image source (optional)
  iconPosition?: "left" | "right";
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  placeholder = "Enter text...",
  type = "text",
  value,
  onChange,
  className = "",
  icon,
  iconPosition = "left",
  onIconClick,
}) => {
  return (
    <div className="relative w-full">
      {icon && iconPosition === "left" && (
        <button type="button" onClick={onIconClick}>
          <img
            src={icon}
            className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
          />
        </button>
      )}

      <input
        className={`border-primary focus:border-secondary focus:ring-secondary/50 font-poppins w-full rounded-lg border px-3 py-2 text-sm placeholder-gray-400 transition-all duration-200 outline-none focus:ring-2 focus:outline-none ${
          icon ? (iconPosition === "left" ? "pl-9" : "pr-9") : ""
        } ${className}`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />

      {icon && iconPosition === "right" && (
        <button
          className="hover:bg-secondary/20 cursor-pointer"
          type="button"
          onClick={onIconClick}
        >
          <img
            src={icon}
            className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400"
          />
        </button>
      )}
    </div>
  );
};
export default Input;
