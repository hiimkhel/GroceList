import React, { useEffect } from "react";
import { getAuthHeaders, getUserId } from "../utils/authUtils";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;
// Create a blueprint for the expected data
interface User {
  name: String;
  email: String;
  password: string,
  address: String;
}

const Profile: React.FC = () => {
    // A react state to store user fetched data
    const [user, setUser] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Function that delete the user from the database
    const handleDeleteAccount = async () => {
        const userId = getUserId();

        // Error handling if userId does not exist
        if(!userId){
            alert("User is not logged in");
            return;
        }

        const confirmDelete = confirm(
              "⚠️ Are you sure you want to delete your account? This action cannot be undone."
        );

        if(!confirmDelete)return;

        try{
            setIsDeleting(true);

            const response = await fetch(`${API_BASE}/api/user/${userId}`,
               { method: "DELETE",
                headers: getAuthHeaders()
               }
            );

            if (!response.ok) throw new Error("Account deletion failed.");

            // Clear the local storage & redirect to index
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert("Account successfully deleted!");
            window.location.href = "/";
        }catch(err){
            console.error(err);
        }finally{
            setIsDeleting(false);
        }
    }

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
              headers: getAuthHeaders()
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

    return(
        <div>
            <h4>Profile</h4>
            {/* User Profile Card */}
            <div>
                {/* Personal Details */}
                <div>
                    {/* Avatar & Name */}
                    <div className="flex">
                        {/* User Avatar */}
                        <div className="bg-secondary h-12 w-12 rounded-full"></div>
                        <h2>{user?.name}</h2>
                    </div>

                    {/* Email and Password */}
                    <div>
                        {/* Email Container */}
                        <div className="flex">
                            {/* icon and title */}
                            <div>
                                <img></img> {/* INSERT ICON */}
                                <h4>Email: </h4>
                            </div>
                            {user?.email}
                        </div>

                        {/* Password Container */}
                        <div className="flex">
                            {/* icon and title */}
                            <div>
                                <img></img> {/* INSERT ICON */}
                                <h4>Password: </h4>
                            </div>
                            ************
                        </div>
                    </div>


                    {/* Edit and Delete Buttons */}
                    <div className="flex">
                        <button>
                            Edit Profile
                            <img></img> {/* INSERT ICON */}
                        </button>

                        <button onClick={handleDeleteAccount} disabled={isDeleting}>
                            Delete Account
                            <img></img> {/* INSERT ICON */}
                        </button>
                    </div>


                </div>
                {/* Address Map Details */}
                <div>

                </div>
            </div>
        </div>
    )
}
export default Profile;