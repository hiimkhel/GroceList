import React from 'react';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder = "Enter text...",
  type = "text",
  value,
  onChange,
  className = "",
}) => {
    return (
    <main>
      <input 
      className={
        `px-2 py-1 w-full rounded-lg border border-primary focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all duration-200 outline-none placeholder-gray-400 font-poppins text-sm`
      }
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange} />
    </main>
    );
};
export default Input;
