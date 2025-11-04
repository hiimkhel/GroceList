// import React from "react";

import { Link } from "react-router-dom";
import Button from "../components/Button";
import '../index.css';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-green-600">GroceList</h1>
        <nav className="space-x-6">
          <Link to="/login" className="text-gray-700 hover:text-green-600">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row flex-grow items-center justify-center px-10 md:px-20 py-16 bg-gray-50">
        {/* Left Text Section */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl font-bold text-green-600">GroceList</h1>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Simplify your grocery shopping.
          </h2>
          <p className="text-gray-600 mb-6">
            GroceList helps you plan, track, and manage your groceries efficiently —
            so you never forget what you need.
          </p>
          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Right Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/logo.png" // put your app’s logo or hero image in public/
            alt="GroceList illustration"
            className="max-w-xs md:max-w-md"
          />
        </div>

        <div>
        <h1>Testing</h1>
        <div className="bg-primary text-white p-4">Primary background</div>
        <div className="bg-secondary text-black p-4">Secondary background</div>
        <div className="bg-bg text-text p-4">BG + Text test</div>
        <div className="bg-[rgb(var(--color-primary))] text-[rgb(var(--color-bg))] p-4">BG + Text test
        </div>
        <div className="bg-primary text-text p-4">NEW test
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="bg-primary text-bg p-4 rounded-xl font-poppins">
            Tailwind v4 color test 
          </div>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button size="lg" variant="primary">Large Primary</Button>
          <button className="bg-primary text-text hover:bg-primary/90 active:bg-secondary active:text-primary">Click Me</button>
        </div>
      </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm bg-white">
        © {new Date().getFullYear()} GroceList. All rights reserved.
      </footer>
    </div>
  );
}
