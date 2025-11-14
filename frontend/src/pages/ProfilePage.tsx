import Sidebar from "../components/Sidebar";
import Navbar from "../components/AppNavbar";
import React from "react";
import Profile from "../components/Profile";
import { useState } from "react";
import ProfileAddress from "../components/ProfileAddress";

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
          <section className="flex flex-row">
            {/* Profile, Address */}
            <article className="flex flex-col rounded-2xl bg-[#F7F7F7] p-8 shadow-sm">
              <Profile />
              {/* Address component */}
              <ProfileAddress />
            </article>
            {/* Transaction History */}
            <article className="flex flex-col bg-[#F7F7F7]"></article>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
