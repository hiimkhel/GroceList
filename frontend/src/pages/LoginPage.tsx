// import React from "react";

import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import '../index.css';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen flex flex-col overflow-hidden bg-primary">
      {/* Login Component */}
      <LoginForm></LoginForm>
    </div>
  );
}
