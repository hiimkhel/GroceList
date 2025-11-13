import Sidebar from "../components/Sidebar";
import React from "react";
import Profile from "../components/Profile";
import { useState } from "react";

const ProfilePage = () => {

    const [isOpen, setIsOpen] = useState(true); // state controlling sidebar
    return(
        <div className="flex h-screen">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <Profile />
        </div>
    )
}

export default ProfilePage;