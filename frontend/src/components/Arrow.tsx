import React from "react";

interface ArrowProps extends React.SVGProps<SVGSVGElement> {}

const Arrow: React.FC<ArrowProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="block mt-2 h-6 w-6 text-primary hover:text-secondary transition-colors"
      {...props} // allows overriding className, style, onClick, etc.
    >
      <path d="M16.7501 7.49995H2.56061L7.28034 12.2197C7.57323 12.5126 7.57323 12.9873 7.28034 13.2802C6.98744 13.5731 6.51267 13.5731 6.21979 13.2802L0.219789 7.28022L0.168031 7.22358C-0.0721909 6.92901 -0.0547575 6.49425 0.219789 6.21968L6.21979 0.219676C6.51265 -0.073188 6.98744 -0.0731302 7.28034 0.219676C7.57323 0.512569 7.57323 0.98733 7.28034 1.28022L2.56061 5.99995H16.7501C16.9489 5.99995 17.1397 6.07908 17.2803 6.21968C17.421 6.36032 17.5 6.55106 17.5001 6.74995C17.5001 6.94886 17.421 7.13957 17.2803 7.28022C17.1397 7.42086 16.949 7.49995 16.7501 7.49995Z" />
    </svg>
  );
};

export default Arrow;
