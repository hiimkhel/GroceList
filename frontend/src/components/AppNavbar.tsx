import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/GrocelistLogo.svg";
import Menu from "../components/Menu";
import Icon from "./IconButton";
import Sidebar from "../components/Sidebar";

const AppNavbar: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <header className="flex flex-row items-center justify-between bg-white px-4 py-2 shadow-sm">
        {/* Hamburger Menu */}
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu className="text-primary cursor-pointer"></Menu>
        </button>
        {/* GroceList Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={Logo} alt="GroceList logo" className="h-12 w-auto" />
        </Link>
        {/* Buttons */}
        <div className="space-x-3">
          <Icon variant="outline" size="md" className="">
            C
          </Icon>
          <Icon variant="primary" size="md">
            C
          </Icon>
          <Icon variant="primary" size="md">
            E
          </Icon>
        </div>
      </header>
    </>
  );
};
export default AppNavbar;
