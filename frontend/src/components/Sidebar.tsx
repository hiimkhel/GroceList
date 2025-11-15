import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Menu from "../components/Menu";
import Marketplace from "../assets/Marketplace.svg";
import Checklist from "../assets/Checklist.svg";
import Cart from "../assets/ShoppingCart.svg";
import Location from "../assets/Location.svg";
import Logout from "../assets/Exit.svg";
import { getAuthHeaders, getUserId } from "../utils/authUtils";
import "../index.css";

// Import backend url from .env
const API_BASE = import.meta.env.VITE_API_BASE;

// Create a blueprint for the expected data
interface User {
  name: String;
  email: String;
  address: String;
}

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, setIsOpen }) => {
  // A react state to store user fetched data
  const [user, setUser] = useState<User | null>(null);
  const redirect = useNavigate();

  // fetches the users data from the backend
  useEffect(() => {
    // Async function to fetch the user data
    const fetchUserData = async () => {
      try {
        // Apply utility
        const userId = getUserId();
        if (!userId) {
          console.warn("User not logged in");
          return;
        }
        // store the response of the upcoming data from backend
        const response = await fetch(`${API_BASE}/api/user/${userId}`, {
          headers: getAuthHeaders(),
        });

        // Store that data to a json
        const data = await response.json();

        // Update user state
        setUser(data);
      } catch (err) {
        console.error("Error fetching data: ", err);
      }
    };

    fetchUserData();
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    redirect("/");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`bg-primary h-screen overflow-hidden text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-0"
        }`}
      >
        {/* Sidebar */}
        <main
          className={`bg-primary fixed top-0 left-0 z-30 flex h-screen w-[300px] flex-col justify-between p-4 text-white transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-5">
            {/* Hamburger Menu */}
            <button onClick={() => setIsOpen(false)}>
              <Menu className="cursor-pointer text-white"></Menu>
            </button>

            {/* User Info */}
            <div className="mx-auto flex h-auto w-full flex-col items-center justify-center rounded-lg bg-white px-6 py-3">
              {/* Ternary Operator to display loading if is not yet fetched */}
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    {/* User Avatar */}
                    <div className="bg-secondary h-12 w-12 flex-shrink-0 rounded-full"></div>

                    {/* Card Info */}
                    <div>
                      <p className="font-secular font-semibold text-black">
                        {user.name}
                      </p>
                      <p className="text-primary text-sm">{user.email}</p>
                      <div className="flex flex-row items-start space-x-1 text-sm">
                        <img className="mt-1.5" src={Location} />
                        <p className="line-clamp-2 text-sm text-gray-600 italic">
                          {JSON.stringify(user.address)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Link to view profile */}
                  <Link to="/user">
                    <p className="text-primary hover:text-secondary mt-2 text-sm underline">
                      View Profile
                    </p>
                  </Link>
                </>
              ) : (
                <p className="text-primary text-sm italic">Loading...</p>
              )}
            </div>

            {/* Menu */}
            <div className="flex flex-col space-y-4">
              <Link
                to="/marketplace"
                className="border-secondary hover:bg-secondary/20 flex flex-row items-center gap-4 border-t-2 px-3 py-2.5"
              >
                <img className="h-5 w-auto" src={Marketplace} />
                <h4>Marketplace</h4>
              </Link>
              <Link
                to="/lists"
                className="border-secondary hover:bg-secondary/20 flex flex-row items-center gap-4 border-t-2 px-3 py-2.5"
              >
                <img className="h-5 w-auto" src={Checklist} />
                <h4>Checklist</h4>
              </Link>
              <Link
                to="/cart"
                className="border-secondary hover:bg-secondary/20 flex flex-row items-center gap-4 border-t-2 px-3 py-2.5"
              >
                <img className="h-5 w-auto" src={Cart} />
                <h4>Shopping Cart</h4>
              </Link>
            </div>
          </div>

          <button
            className="border-secondary flex cursor-pointer flex-row items-center gap-4 border-t-2 px-3 py-2.5 hover:bg-red-500/80"
            onClick={handleLogout}
          >
            <img className="h-5 w-auto" src={Logout} />
            <h4>Log Out</h4>
          </button>
        </main>
      </div>
    </>
  );
};

export default Sidebar;
