import React, { useEffect } from "react";
import EmailIcon from "../assets/Email.svg";
import PasswordIcon from "../assets/Password.svg";
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
import ShownIcon from "../assets/VisibleIcon.svg";
import HiddenIcon from "../assets/InvisibleIcon.svg";
import Button from "../components/Button";
import { getAuthHeaders, getUserId } from "../utils/authUtils";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;
// Create a blueprint for the expected data
interface User {
  name: String;
  email: String;
  password: string;
  address: String;
}

const TransactionHistory: React.FC = () => {
  return (
    // User profile card
    <main className="flex flex-col gap-3">
      {/* Avatar & Name */}
      <div className="flex flex-row gap-4">
        {/* User Avatar */}
        <h3 className="font-secular text-4xl">Transaction History</h3>
      </div>
    </main>
  );
};
export default TransactionHistory;
