import React, { useState } from "react";
import DropdownIcon from "../assets/Dropdown.svg";

interface DropdownProps {
  label: string; // Dropdown button label
  options: string[]; // Array of items inside the dropdown
  onSelect?: (option: string) => void; // Callback when an item is clicked
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        type="button"
        className="bg-secondary text-primary flex inline-flex w-max flex-row items-center justify-between rounded-4xl px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span
          className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <img src={DropdownIcon} alt="" />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="py-1">
            {options.map((option, idx) => (
              <li
                key={idx}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
