import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../assets/GrocelistLogo.svg";
import Arrow from "../components/Arrow";
import Email from "../assets/Email.svg";
import Password from "../assets/Password.svg";
import Input from "../components/Input"
import Google from "../assets/GoogleIcon.svg"
import '../index.css';

const LoginForm: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <main className="flex flex-col justify-between px-12 py-6 rounded-2xl bg-white w-max h-[600px]">
      <section className="flex flex-col justify-between gap-2 h-full">
        {/* Upper */}
        <article className="flex flex-col gap-2">
          {/* Header */}
          <header className="flex flex-row justify-between items-center pb-2 w-full">
            <Link to="/">
              <Arrow></Arrow>
            </Link>
            <img className="h-8 w-auto" src={Logo} alt="" />
            <div className="w-6"></div>
          </header>

          {/* Title */}
          <div className="pb-1">
            <h1 className="text-3xl text-primary font-secular">
              {mode === "login" ? "Welcome" : "Create Account"}</h1>
            <p className="text-gray-700">{mode === "login"
              ? "Shop for groceries at your convenience."
              : "Register to start shopping."
            }
            </p>
          </div>
          
          {/* Switch Login/Register */}
          <div className="flex flex-row justify-around bg-[#EDEDED] px-3 py-2 rounded-xl w-full gap-2 mb-2">
            <Button 
            className="w-full" variant="secondary" 
            size="md" 
            onClick={() => setMode("login")}>Login</Button>
            <Button 
            variant="secondary" 
            size="md" className="bg-transparent border-none text-primary w-full"
            onClick={() => setMode("register")}>Register</Button>
          </div>

          {/* Email Input */}
          <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row items-center gap-1.5">
              <img className="h-2.5 w-auto" src={Email} alt="" />
              <h2 className="text-sm text-primary">Email</h2>
            </div>
            <Input placeholder="example@domain.com"></Input>
          </div>
          
          {/* Password Input */}
          <div className="flex flex-col w-full gap-1">
            <div className="flex flex-row items-center gap-1.5">
              <img className="h-2.5 w-auto" src={Password} alt="" />
              <h2 className="text-sm text-primary">Password</h2>
            </div>
            <Input placeholder="********"></Input>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end w-full">
            <Link to="">
              <p className="text-sm underline text-primary hover:text-secondary transition-all duration-400">Forgot Password?</p>
            </Link>
          </div>

          {/* Login button */}
          <div className="flex justify-end w-full">
            <Button className="!rounded-4xl" variant="primary" size="md">Login</Button>
          </div>
          
        </article>

        {/* Lower */}
        <article className="flex flex-col justify-end">
          {/* Login using Google */}
          <div className="flex flex-col w-full mb-3">
            <div className="flex items-center w-full">
            <div className="flex-grow border-t border-gray-400"></div>
            <p className="px-3 py-1 text-gray-400">or</p>
            <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <Button className="flex flex-row items-center justify-center gap-2 border !border-gray-400 !text-gray-500 w-full" variant="outline">
              <img src={Google} className="w-4 h-4" alt="" />
              <span>Login with Google</span>
            </Button>
          </div>
        </article>
      </section>
    </main>
  );
};
export default LoginForm;