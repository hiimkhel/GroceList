import Sidebar from "../components/Sidebar";
import Navbar from "../components/AppNavbar";
import React from "react";
import Profile from "../components/Profile";
import { useState } from "react";
import ProfileAddress from "../components/ProfileAddress";
import TransactionHistory from "../components/TransactionHistory";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(true); // state controlling sidebar
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Page content */}
      <div className={`flex flex-1 flex-col transition-all duration-300`}>
        {/* Navbar */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Main content */}
        <main className="flex flex-col gap-5 px-20 py-5">
          <h2>Profile</h2>
          <section className="flex w-full grow flex-row gap-2">
            {/* Profile, Address */}
            <article className="bg-secondary/5 flex flex-col gap-8 rounded-2xl p-8 shadow-sm">
              <Profile />
              {/* Address component */}
              <ProfileAddress />
            </article>
            {/* Transaction History */}
            <article className="bg-secondary/0 flex grow flex-col rounded-2xl p-8 shadow-sm">
              <TransactionHistory></TransactionHistory>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
