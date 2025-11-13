import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { getUserId, getAuthHeaders } from "../utils/authUtils";

const API_BASE = import.meta.env.VITE_API_BASE;

const AddNewGroceryListPage = () => {
    const [isOpen, setIsOpen] = useState(true); // state controlling sidebar
    const [title, setTitle] = useState("");

    const userId = getUserId();
    const headers = getAuthHeaders();

    // Call backend API for creating a new list with empty cart
        const createNewList = async () => {
            if (!title) return;

            try {
                const res = await fetch(`${API_BASE}/api/lists/${userId}/add`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json", ...headers },
                    body: JSON.stringify({ title: title }),
                });
                const data = await res.json();
                
                console.log(data);
            } catch (err) {
                console.error(err);
            }
        };

    return(
        <div className="flex">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <main className="flex-1 overflow-auto p-6">
                <h2>
                    Add New Grocery List
                </h2>
                <div className="flex">
                    <label>Title: </label>
                    <Input type="text" placeholder="Enter grocery list title here..." value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                
                <Button onClick={createNewList}>
                    Create List
                </Button>
                <p>Return to <a href="/lists">Grocery List</a></p>
            </main>
        </div>
    )
}

export default AddNewGroceryListPage;