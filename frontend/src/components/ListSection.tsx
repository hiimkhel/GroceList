import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserId, getAuthHeaders } from "../utils/authUtils";

const API_BASE = import.meta.env.VITE_API_BASE;

interface GroceryList {
  _id: string;
  title: string;
  items: { _id: string; name: string; quantity: number; isChecked: boolean }[];
}

const ListSection:React.FC = () => {
    const [lists, setLists] = useState<GroceryList[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTitle, setNewTitle] = useState("");

    const userId = getUserId();
    const headers = getAuthHeaders();


    // Call the backend API for fetching all lists
    const fetchLists = async () => {
        try {
        const res = await fetch(`${API_BASE}/api/lists/${userId}`);
        const data = await res.json();
        setLists(data);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchLists();
    }, []);

    if (loading) return <p>Loading lists...</p>;

    return(
        <div>
            <h2>
                Your Grocery Lists
            </h2>

            {/* TODO: Search Bar and Pagination */}
            {/* Display all lists with active and add new */}
            <Link to="/lists/add">
                Add New List
            </Link>
            <div>
                {lists.map((list) => (
                    <Link to={`/lists/${list._id}`}
                    key={list._id}>
                        <h4>{list.title}</h4>
                        <p>{list.items.length} items</p>
                    </Link>
                ))}
            </div>


        </div>
    )
}

export default ListSection;