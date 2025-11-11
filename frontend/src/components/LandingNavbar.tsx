import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/GrocelistLogo.svg";
import Button from "./Button";

const LandingNavbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between bg-white px-12 py-4 shadow-sm">
      <Link to="/" className="flex items-center space-x-2">
        <img src={Logo} alt="GroceList logo" className="h-12 w-auto" />
      </Link>
      <nav className="space-x-3">
        <Button
          variant="outline"
          size="md"
          className="px-6"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button variant="primary" size="md" onClick={() => navigate("/login")}>
          Register
        </Button>
      </nav>
    </header>
  );
};
export default LandingNavbar;
