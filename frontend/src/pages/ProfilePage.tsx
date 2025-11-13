import Sidebar from "../components/Sidebar";
import React from "react";
import Profile from "../components/Profile";
import { useState } from "react";

const ProfilePage = () => {

    const [isOpen, setIsOpen] = useState(true); // state controlling sidebar
    return(
        <div className="flex h-screen">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <div className="flex">
                <Profile />
                {/* Address component */}
            </div>
            
        </div>
    )
}

export default ProfilePage;