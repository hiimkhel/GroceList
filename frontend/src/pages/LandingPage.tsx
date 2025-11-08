// import React from "react";

import { Link } from "react-router-dom";
import Button from "../components/Button";
import LandingNavbar from "../components/LandingNavbar";
import Products from "../assets/Products.svg";
import Ellipse from "../assets/Ellipse.svg";
import '../index.css';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen min-w-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <LandingNavbar></LandingNavbar>
      
      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-start px-15 gap-8">
        {/* Background Ellipse */}
        <div className="overflow-hidden">
          <img src={Ellipse} alt="" className="absolute h-auto w-[720px] bottom-30 right-10 -z-10 translate-x-1/2 translate-y-1/4 md:translate-x-1/3 md:translate-y-1/3 max-w-full"/>
        </div>
        {/* Left Text Section */}
        <div className="flex flex-col max-w-3xl w-full gap-10 md:mb-0">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-primary font-secular">Your everyday <span className="text-secondary">groceries</span>, </h1>
            <h1 className=" font-bold text-primary font-secular">one click away.</h1>
          </div>
          <div className="flex flex-col gap-6 max-w-3xl md:max-w-xl px-1">
            <p className="text-gray-900 font-poppins">
             <b>GroceList</b> is your all-in-one online grocery hub designed for convenience and variety. 
            </p>
            <p className="text-gray-900 font-poppins">
              From fresh produce to home essentials, we make shopping simpler, faster, and smarter — all from the comfort of your home.
            </p>
          </div>
          <Button className="px-1 primary w-max shadow-[0_4px_4px_rgba(0,0,0,0.25)]" size="lg">Shop Now</Button>
        </div>

        {/* Right Image Section */}
        <div className="relative z-10 top-5 left-22 w-[580px] h-auto overflow-hidden max-w-full">
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
