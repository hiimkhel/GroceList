import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/GrocelistLogo.svg";
import Menu from "../components/Menu";
import Icon from "./IconButton";
import ChecklistIcon from "./ChecklistIcon";
import LogoutIcon from "./LogoutIcon";
import Cart from "./Cart";

const AppNavbar: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <header className="flex flex-row items-center justify-between bg-white px-10 py-2 shadow-sm">
        {/* Hamburger Menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${isOpen ? "invisible" : "visible"}`}
        >
          <Menu className="text-primary cursor-pointer" />
        </button>

        {/* GroceList Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="GroceList logo" className="h-12 w-auto" />
        </Link>
        {/* Buttons */}
        <div className="flex flex-row gap-5">
          <Icon icon={<Cart className="text-primary" />}>
            {/* onClick={() => setIsEditPopupOpen(true)}> */}
          </Icon>
          <Icon icon={<ChecklistIcon className="text-primary" />}>
            {/* onClick={() => setIsEditPopupOpen(true)}> */}
          </Icon>
          <Icon icon={<LogoutIcon className="text-primary" />}>
            {/* onClick={() => setIsEditPopupOpen(true)}> */}
          </Icon>
        </div>
      </header>
    </>
  );
};
export default AppNavbar;
