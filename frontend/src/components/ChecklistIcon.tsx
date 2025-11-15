import React from "react";

interface ChecklistProps extends React.SVGProps<SVGSVGElement> {}

const ChecklistIcon: React.FC<ChecklistProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="currentColor"
      className=""
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.04167 0C0.765399 0 0.500448 0.109747 0.305097 0.305097C0.109747 0.500448 0 0.765399 0 1.04167V23.9583C0 24.2346 0.109747 24.4996 0.305097 24.6949C0.500448 24.8903 0.765399 25 1.04167 25H23.9583C24.2346 25 24.4996 24.8903 24.6949 24.6949C24.8903 24.4996 25 24.2346 25 23.9583V1.04167C25 0.765399 24.8903 0.500448 24.6949 0.305097C24.4996 0.109747 24.2346 0 23.9583 0H1.04167ZM4.16667 8.33333H16.6667V6.25H4.16667V8.33333ZM18.75 8.33333H20.8333V6.25H18.75V8.33333ZM16.6667 13.5417H4.16667V11.4583H16.6667V13.5417ZM18.75 13.5417H20.8333V11.4583H18.75V13.5417ZM16.6667 18.75H4.16667V16.6667H16.6667V18.75ZM18.75 18.75H20.8333V16.6667H18.75V18.75Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChecklistIcon;
