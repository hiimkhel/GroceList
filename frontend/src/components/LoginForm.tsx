import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../assets/GrocelistLogo.svg";
import Arrow from "../assets/Arrow.svg"
import Icon from "./IconButton";
import '../index.css';

const LoginForm: React.FC = () => {
  return (
    <main className="flex flex-col gap-4 items-center px-12 py-6 rounded-2xl bg-white w-max h-[600px]">

      {/* Header */}
      <header className="flex flex-row justify-between items-center">
        <img className="h-4 w-auto" src={Arrow} alt="" />
        <img className="h-10 w-auto" src={Logo} alt="" />
        <div><p></p></div>
      </header>

      {/* Title */}
      <div className="">
        <h1 className="text-3xl text-primary font-secular">Welcome</h1>
        <p className="text-gray-700">Shop for groceries at your convenience.</p>
      </div>
      
      {/* Switch Login/Register */}
      <div className="flex flex-row justify-around bg-[#EDEDED] px-3 py-2 rounded-xl w-full gap-2">
        <Button className="w-full" variant="secondary" size="md">Login</Button>
        <Button variant="secondary" size="md" className="bg-transparent border-none text-primary w-full">Register</Button>
      </div>

      {/* Email Input */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row">
          <img src="" alt="" />
          <h2 className="text-sm text-primary">Email</h2>
        </div>
        <input className="px-2 py-1 border border-primary focus:border-secondary focus:outline-none focus:ring-0 w-full rounded-lg" placeholder="example@domain.com" type="text" />
      </div>
      
      {/* Password Input */}
      <div className="flex flex-col w-full">
        <div className="flex flex-row">
          <img src="" alt="" />
          <h2 className="text-sm text-primary">Password</h2>
        </div>
        <input className="px-2 py-1 border border-primary w-full rounded-lg placeholder-gray-400" placeholder="********" type="text" />
      </div>

      <Button className="rounded-2xl" variant="primary" size="md">Login</Button>
      {/* Login using Google */}
    </main>
  );
};
export default LoginForm;