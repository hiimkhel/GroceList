import React, { useEffect } from "react";
import EmailIcon from "../assets/Email.svg";
import PasswordIcon from "../assets/Password.svg";
import EditIcon from "../assets/Edit.svg";
import DeleteIcon from "../assets/Delete.svg";
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

const Profile: React.FC = () => {
  // A react state to store user fetched data
  const [user, setUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Function that delete the user from the database
  const handleDeleteAccount = async () => {
    const userId = getUserId();

    // Error handling if userId does not exist
    if (!userId) {
      alert("User is not logged in");
      return;
    }

    const confirmDelete = confirm(
      "⚠️ Are you sure you want to delete your account? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      setIsDeleting(true);

      const response = await fetch(`${API_BASE}/api/user/${userId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error("Account deletion failed.");

      // Clear the local storage & redirect to index
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert("Account successfully deleted!");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

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

  return (
    // User profile card
    <main className="flex flex-col gap-3">
      {/* Avatar & Name */}
      <div className="flex flex-row gap-4">
        {/* User Avatar */}
        <div className="bg-secondary h-12 w-12 rounded-full"></div>
        <h3 className="text-4xl">{user?.name}</h3>
      </div>

      {/* Email and Password */}
      <div className="flex flex-col gap-2">
        {/* Email Container */}
        <div className="border-secondary flex w-full flex-row items-center">
          <div className="flex flex-row items-center gap-2">
            <img className="h-4 w-4" src={EmailIcon}></img>
            <h4>Email: </h4>
          </div>
          <div className="flex grow flex-row">
            <p className="border-secondary rounded-lg border-2 bg-white px-3 shadow-inner">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Password Container */}
        <div className="flex w-full flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <img className="h-4 w-4" src={PasswordIcon}></img>
            <h4>Password: </h4>
          </div>
          <div className="flex grow flex-row">
            <p className="border-secondary rounded-lg border-2 bg-white px-3 shadow-inner">
              ************
            </p>
          </div>
        </div>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="flex">
        <Button
          size="md"
          variant="primary"
          icon=""
          onClick={handleDeleteAccount}
        >
          Edit Profile
        </Button>
        <button>
          <img></img> {/* INSERT ICON */}
        </button>

        {/* <button onClick={handleDeleteAccount} disabled={isDeleting}>
          Delete Account
          <img></img> INSERT ICON 
        </button> */}
      </div>
    </main>
  );
};
export default Profile;
