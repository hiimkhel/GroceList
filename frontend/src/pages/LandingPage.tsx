// import React from "react";

import { Link } from "react-router-dom";
import Button from "../components/Button";
import LandingNavbar from "../components/LandingNavbar";
import Products from "../assets/Products.svg";
import Ellipse from "../assets/Ellipse.svg";
import '../index.css';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <LandingNavbar></LandingNavbar>
      
      {/* Hero Section */}
      <main className="relative flex flex-col md:flex-row grow items-center justify-start px-50 md:px-20 py-16">
        {/* Background Ellipse */}
        <div className="">
          <img src={Ellipse} alt="" className="absolute h-[981px] w-[944px] bottom-0 right-0 -z-10 translate-x-[20%] translate-y-[10%] md:translate-x-1/3 md:translate-y-1/3"/>
        </div>
        {/* Left Text Section */}
        <div className="flex flex-col max-w-3xl w-full mb-10 gap-10 md:mb-0">
          <div className="flex flex-col gap-3">
            <h1 className="text-[64px] font-bold text-primary font-secular">Your everyday <span className="text-secondary">groceries</span>, </h1>
            <h1 className="text-[64px] font-bold text-primary font-secular">one click away.</h1>
          </div>
          <div className="max-w-3xl md:max-w-xl">
            <p className="text-gray-900 mb-6 font-poppins">
             <b>GroceList</b> is your all-in-one online grocery hub designed for convenience and variety. 
            </p>
            <p className="text-gray-900 mb-6 font-poppins">
              From fresh produce to home essentials, we make shopping simpler, faster, and smarter — all from the comfort of your home.
            </p>
          </div>
          <Button className="primary w-max" size="lg">Shop Now</Button>
        </div>

        {/* Right Image Section */}
        <div className="relative z-10 h-[740px]">
          <img src={Products} alt="" />
        </div>
      </main>
      

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm bg-white font-poppins">
        © {new Date().getFullYear()} GroceList. All rights reserved.
      </footer>
    </div>
  );
}
