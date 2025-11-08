import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';
import '../index.css';

interface User{
    name: String,
    email: String,
    address: String
}
const SideBar: React.FC = () => {
    // A react state to store user fetched data
    const [user, setUser] = useState<User |null>(null);

    // fetches the users data from the backend
    useEffect(() => {

        // TODO: Implement dynamic fetching of the current user userId
        const userId = "690ee6f20f368479b4923c5e";

        // Async function to fetch the user data
        const fetchUserData = async () => {
            try{
                // store the response of the upcoming data from backend
                const response = await fetch(`http://localhost:5000/api/user/${userId}`);

                // Store that data to a json
                const data = await response.json();

                // Update user state
                setUser(data);
            }catch(err){
                console.error('Error fetching data: ', err);
            }
        };

        fetchUserData();
    }, []);
    
  return (
    <div className="h-screen w-[300px] bg-primary p-4 flex flex-col justify-between text-white">
      <div className="space-y-6">
        <Link to="/">
          <img src="../assets/Hamburger.svg" alt="Menu" />
        </Link>

        <div className="flex flex-col h-[150px] w-[95%] rounded-lg bg-white mx-auto items-center justify-center text-black">
            {/* User Card Info */}
            {/* Ternary Operator to display loading if is not yet fetched */}
          {user ? (
                <>
                <div className="flex items-center space-x-3">
                    {/* User Avatar */}
                    <div className="h-[50px] w-[50px] rounded-full bg-primary"></div>

                    {/* Card Info */}
                    <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm">{user.email}</p>
                    <div className="flex items-center space-x-1 text-sm">
                        <img src="../assets/Location.svg"/>
                        <p>{user.address}</p>
                    </div>
                    </div>
                </div>

                {/* Link to view profile */}
                <a href="#" className="mt-2 text-blue-600 text-sm">
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
            <img src="../assets/Marketplace.svg"/>
            <h3>Marketplace</h3>
          </Link>
          <Link to="/checklist" className="flex items-center space-x-2">
            <img src="../assets/Checklist.svg" />
            <h3>Checklist</h3>
          </Link>
          <Link to="/cart" className="flex items-center space-x-2">
            <img src="../assets/ShoppingCart.svg"/>
            <h3>Shopping Cart</h3>
          </Link>
        </div>
      </div>

      <div className="w-4/5 mx-auto rounded-lg py-2 flex items-center justify-center">
        <img src="../assets/Logout.svg" className="w-5 h-5 mr-2" />
        <h3>Logout</h3>
      </div>
    </div>
  );
};

export default SideBar;