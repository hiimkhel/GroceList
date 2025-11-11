// import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import LandingNavbar from "../components/LandingNavbar";
import Products from "../assets/Products.svg";
import Ellipse from "../assets/Ellipse.svg";
import "../index.css";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen min-w-screen flex-col overflow-hidden">
      {/* Navbar */}
      <LandingNavbar></LandingNavbar>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-start gap-8 px-15 md:flex-row">
        {/* Background Ellipse */}
        <div className="overflow-hidden">
          <img
            src={Ellipse}
            alt=""
            className="absolute right-10 bottom-30 -z-10 h-auto w-[720px] max-w-full translate-x-1/2 translate-y-1/4 md:translate-x-1/3 md:translate-y-1/3"
          />
        </div>
        {/* Left Text Section */}
        <div className="flex w-full max-w-3xl flex-col gap-10 md:mb-0">
          <div className="flex flex-col gap-3">
            <h1 className="text-primary font-secular font-bold">
              Your everyday <span className="text-secondary">groceries</span>
              ,{" "}
            </h1>
            <h1 className="text-primary font-secular font-bold">
              one click away.
            </h1>
          </div>
          <div className="flex max-w-3xl flex-col gap-6 px-1 md:max-w-xl">
            <p className="font-poppins text-gray-900">
              <b>GroceList</b> is your all-in-one online grocery hub designed
              for convenience and variety.
            </p>
            <p className="font-poppins text-gray-900">
              From fresh produce to home essentials, we make shopping simpler,
              faster, and smarter — all from the comfort of your home.
            </p>
          </div>
          <Button
            className="primary w-max px-1 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            size="lg"
            onClick={() => navigate("/auth/login")}
          >
            Shop Now
          </Button>
        </div>

        {/* Right Image Section */}
        <div className="relative top-5 left-22 z-10 h-auto w-[580px] max-w-full overflow-hidden">
          <img src={Products} alt="" />
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="text-center py-4 text-gray-500 text-sm bg-white font-poppins">
        © {new Date().getFullYear()} GroceList. All rights reserved.
      </footer> */}
    </div>
  );
}
