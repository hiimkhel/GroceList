// NOT DONE

import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/GrocelistLogo.svg";
import Icon from "./IconButton";

const AppNavbar: React.FC = () => {
  return (
    <header className="flex flex-row justify-between items-center px-12 py-4 bg-white shadow-sm">
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={Logo}
          alt="GroceList logo"
          className="h-12 w-auto"
        />
      </Link>
      <nav className="space-x-3">
        <Icon variant="outline" size="md" className="px-6">Login</Icon>
        <Icon variant="primary" size="md">Register</Icon>
      </nav>
    </header>
  );
};
export default AppNavbar;