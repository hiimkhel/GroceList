import React from "react";

type IconButtonProps = {
  active?: boolean;
  onClick?: () => void;
  icon: React.ReactNode;
  className?: string;
};

const IconButton: React.FC<IconButtonProps> = ({
  active = false,
  onClick,
  icon,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-center rounded-full border p-2 transition-all duration-200 ${active ? "bg-primary border-primary" : "border-gray-300 bg-white"} ${className} `}
    >
      <span
        className={`transition-colors duration-200 ${active ? "text-white" : "text-primary"} `}
      >
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
