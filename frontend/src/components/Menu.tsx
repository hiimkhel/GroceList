import React from "react";

interface MenuProps extends React.SVGProps<SVGSVGElement> {}

const Menu: React.FC<MenuProps> = ({
  className,
  stroke = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="23"
      viewBox="0 0 30 23"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M1.5 1.5H28.5M1.5 11.5H28.5M1.5 21.5H28.5"
        stroke={stroke}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Menu;
