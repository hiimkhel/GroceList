import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/GrocelistLogo.svg";
import Menu from "../components/Menu";
import Icon from "./IconButton";
import ChecklistIcon from "./ChecklistIcon";
import LogoutIcon from "./LogoutIcon";
import Cart from "./Cart";
import CartPopup from "./popups/Cart";
import ListPopup from "./popups/List";
import LogoutPopup from "./popups/Logout";

const AppNavbar: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  const [activeIcon, setActiveIcon] = React.useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Handle icon click
  const handleIconClick = (iconName: string) => {
    // If clicking the same icon, toggle off
    setActiveIcon(activeIcon === iconName ? null : iconName);
  };

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
          <Icon
            icon={<Cart />}
            active={activeIcon === "cart"}
            onClick={() => {
              if (activeIcon === "cart") {
                setActiveIcon(null);
                setIsDialogOpen(false);
              } else {
                setActiveIcon("cart");
                setIsDialogOpen(true);
              }
            }}
          />

          <Icon
            icon={<ChecklistIcon />}
            active={activeIcon === "checklist"}
            onClick={() => {
              if (activeIcon === "checklist") {
                setActiveIcon(null);
                setIsDialogOpen(false);
              } else {
                setActiveIcon("checklist");
                setIsDialogOpen(true);
              }
            }}
          />
          <Icon
            icon={<LogoutIcon />}
            active={activeIcon === "logout"}
            onClick={() => {
              if (activeIcon === "logout") {
                setActiveIcon(null);
                setIsDialogOpen(false);
              } else {
                setActiveIcon("logout");
                setIsDialogOpen(true);
              }
            }}
          />

          {/* Render popups */}
          {activeIcon === "cart" && <CartPopup />}

          {activeIcon === "checklist" && <ListPopup />}
          {activeIcon === "logout" && <LogoutPopup />}
        </div>
      </header>
    </>
  );
};
export default AppNavbar;
