import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../assets/GrocelistLogo.svg";
import Arrow from "../components/Arrow";
import Email from "../assets/Email.svg";
import Password from "../assets/Password.svg";
import Input from "../components/Input";
import Google from "../assets/GoogleIcon.svg";
import User from "../assets/User.svg";
import "../index.css";

const LoginForm: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  // Conditional input fields for register
  const renderInputs = () => {
    if (mode === "login") {
      return (
        <>
          <div className="flex flex-col gap-1 overflow-hidden transition-all duration-500 ease-in-out">
            {/* Email */}
            <div className="flex w-full flex-col gap-1">
              <div className="flex flex-row items-center gap-1.5">
                <img className="h-2.5 w-auto" src={Email} alt="" />
                <h2 className="text-primary text-sm">Email</h2>
              </div>
              <Input placeholder="example@domain.com" />
            </div>

            {/* Password */}
            <div className="flex w-full flex-col gap-1">
              <div className="flex flex-row items-center gap-1.5">
                <img className="h-2.5 w-auto" src={Password} alt="" />
                <h2 className="text-primary text-sm">Password</h2>
              </div>
              <Input type="password" placeholder="********" />
            </div>
          </div>
        </>
      );
    } else {
      // Register mode
      return (
        <>
          <div className="flex flex-col gap-1 overflow-hidden transition-all duration-500 ease-in-out">
            {/* Full Name */}
            <div className="flex w-full flex-col gap-1">
              <div className="flex flex-row items-center gap-1.5">
                <img className="h-2.5 w-auto" src={User} alt="" />
                <h2 className="text-primary text-sm">Full Name</h2>
              </div>
              <Input placeholder="John Doe" />
            </div>

            {/* Email */}
            <div className="flex w-full flex-col gap-1">
              <div className="flex flex-row items-center gap-1.5">
                <img className="h-2.5 w-auto" src={Email} alt="" />
                <h2 className="text-primary text-sm">Email</h2>
              </div>
              <Input placeholder="example@domain.com" />
            </div>

            {/* Password */}
            <div className="flex w-full flex-col gap-1">
              <div className="flex flex-row items-center gap-1.5">
                <img className="h-2.5 w-auto" src={Password} alt="" />
                <h2 className="text-primary text-sm">Password</h2>
              </div>
              <Input type="password" placeholder="********" />
            </div>

            {/* Confirm Password */}
            <div className="mb-2 flex w-full flex-col gap-1">
              <div className="flex flex-row items-center gap-1.5">
                <img className="h-2.5 w-auto" src={Password} alt="" />
                <h2 className="text-primary text-sm">Confirm Password</h2>
              </div>
              <Input type="password" placeholder="********" />
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <main className="flex h-[650px] w-[380px] flex-col justify-between rounded-2xl bg-white px-12 py-6">
      <section className="flex h-full flex-col justify-between gap-2">
        {/* Upper */}
        <article className="flex flex-col gap-2">
          {/* Header */}
          <header className="flex w-full flex-row items-center justify-between pb-2">
            <Link to="/">
              <Arrow />
            </Link>
            <img className="h-8 w-auto" src={Logo} alt="" />
            <div className="w-6"></div>
          </header>

          {/* Title */}
          <div className="pb-1">
            <h1 className="text-primary font-secular text-3xl">
              {mode === "login" ? "Welcome" : "Create Account"}
            </h1>
            <p className="font-poppins text-sm text-gray-500">
              {mode === "login"
                ? "Shop for groceries at your convenience."
                : "Register to start shopping."}
            </p>
          </div>

          {/* Toggle Login/Register */}
          <div className="mb-2 flex w-full flex-row justify-around gap-2 rounded-xl bg-[#EDEDED] px-3 py-2">
            <Button
              className={`w-full py-2 ${
                mode === "login"
                  ? "bg-primary"
                  : "text-primary border-none bg-transparent"
              }`}
              variant="secondary"
              size="sm"
              onClick={() => setMode("login")}
            >
              Login
            </Button>
            <Button
              className={`w-full py-2 ${
                mode === "register"
                  ? "bg-primary"
                  : "text-primary border-none bg-transparent"
              }`}
              variant="secondary"
              size="sm"
              onClick={() => setMode("register")}
            >
              Register
            </Button>
          </div>

          {/* Input fields */}
          {renderInputs()}

          {/* Forgot Password (only login) */}
          {mode === "login" && (
            <div className="flex w-full justify-end">
              <Link to="">
                <p className="text-primary hover:text-secondary text-sm underline transition-all duration-300">
                  Forgot Password?
                </p>
              </Link>
            </div>
          )}

          {/* Submit button */}
          <div className="flex w-full flex-row justify-end">
            <Button
              className="flex flex-row items-center gap-2 !rounded-4xl"
              variant="primary"
              size="md"
            >
              {mode === "login" ? "Login" : "Register"}
              <Arrow className="mb-1 h-4 w-auto rotate-180 transform" />
            </Button>
          </div>
        </article>

        {/* Lower */}
        <article className="flex flex-col justify-end">
          {/* Login/Register using Google */}
          <div className="mb-3 flex w-full flex-col">
            <div className="flex w-full items-center">
              <div className="flex-grow border-t border-gray-400"></div>
              <p className="px-3 py-1 text-gray-400">or</p>
              <div className="flex-grow border-t border-gray-400"></div>
            </div>
            <Button
              className="flex w-full flex-row items-center justify-center gap-2 border !border-gray-400 !text-gray-500 hover:!text-gray-100"
              variant="outline"
            >
              <img src={Google} className="h-4 w-4" alt="" />
              <span className="">
                {mode === "login" ? "Login with Google" : "Sign up with Google"}
              </span>
            </Button>
          </div>
        </article>
      </section>
    </main>
  );
};

export default LoginForm;
