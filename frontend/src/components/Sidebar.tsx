import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import Menu from "../assets/Hamburger.svg";
import Marketplace from "../assets/Marketplace.svg";
import Checklist from "../assets/Checklist.svg";
import Cart from "../assets/ShoppingCart.svg";
import Location from "../assets/Location.svg";
import Logout from "../assets/Exit.svg";

import "../index.css";

interface User {
  name: String;
  email: String;
  address: String;
}
const SideBar: React.FC = () => {
  // A react state to store user fetched data
  const [user, setUser] = useState<User | null>(null);

  // fetches the users data from the backend
  useEffect(() => {
    // TODO: Implement dynamic fetching of the current user userId
    const userId = "6906e85e53679779b2beed7d";

    // Async function to fetch the user data
    const fetchUserData = async () => {
      try {
        // store the response of the upcoming data from backend
        const response = await fetch(
          `http://localhost:5000/api/user/${userId}`,
        );

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

  return (
    <main className="bg-primary flex h-screen w-[250px] flex-col justify-between p-4 text-white">
      <div className="flex flex-col gap-2">
        {/* Menu */}
        <Link to="/">
          <img src={Menu} alt="Menu" />
        </Link>

        <div className="mx-auto flex h-auto w-full flex-col items-center justify-center rounded-lg bg-white px-6 py-3">
          {/* User Card Info */}
          {/* Ternary Operator to display loading if is not yet fetched */}
          {user ? (
            <>
              <div className="flex items-center gap-3">
                {/* User Avatar */}
                <div className="bg-secondary h-12 w-12 rounded-full"></div>

                {/* Card Info */}
                <div>
                  <p className="font-secular font-semibold text-black">
                    {user.name}
                  </p>
                  <p className="text-primary text-sm">{user.email}</p>
                  <div className="flex items-center space-x-1 text-sm">
                    <img src={Location} />
                    <p className="text-sm text-gray-600 italic">
                      {user.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Link to view profile */}
              <a href="#" className="mt-2 text-sm text-blue-600">
                View Profile
              </a>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Menu */}
        <div className="flex flex-col space-y-4">
          <Link to="/marketplace" className="flex items-center space-x-2">
            <img src="../assets/Marketplace.svg" />
            <h3>Marketplace</h3>
          </Link>
          <Link to="/checklist" className="flex items-center space-x-2">
            <img src="../assets/Checklist.svg" />
            <h3>Checklist</h3>
          </Link>
          <Link to="/cart" className="flex items-center space-x-2">
            <img src="../assets/ShoppingCart.svg" />
            <h3>Shopping Cart</h3>
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-4/5 items-center justify-center rounded-lg py-2">
        <img src="../assets/Logout.svg" className="mr-2 h-5 w-5" />
        <h3>Logout</h3>
      </div>
    </main>
  );
};

export default SideBar;
