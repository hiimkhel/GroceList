import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/GrocelistLogo.svg";
import Button from "./Button";

const LandingNavbar: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-12 py-4 bg-white shadow-sm">
      <Link to="/" className="flex items-center space-x-2">
        <img
          src={Logo}
          alt="GroceList logo"
          className="h-12 w-auto"
        />
      </Link>
      <nav className="space-x-3">
        <Button variant="outline" size="md" className="px-6">Login</Button>
        <Button variant="primary" size="md">Register</Button>
      </nav>
    </header>
  );
};
export default LandingNavbar;