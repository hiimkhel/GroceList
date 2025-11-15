import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Button from "../components/Button";
import Add from "../assets/Add.svg";
import { getUserId, getAuthHeaders } from "../utils/authUtils";

const API_BASE = import.meta.env.VITE_API_BASE;

interface GroceryList {
  _id: string;
  title: string;
  items: { _id: string; name: string; quantity: number; isChecked: boolean }[];
}

const ListSection: React.FC = () => {
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

  return (
    <div>
      <h2>Your Lists</h2>
      <div className="flex w-full flex-1 flex-row items-center gap-3">
        <Search placeholder="Search for a list..."></Search>
        <Button variant="primary" size="md" className="w-50">
          Set an Active List
        </Button>
      </div>
      {/* Display all lists with active and add new */}
      <div className="mt-4 grid w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:gap-x-2 sm:gap-y-4">
        {/* Add Button */}
        <div className="flex w-full flex-col items-center justify-start">
          <Link to="/lists/add">
            <button className="bg-secondary flex h-55 w-full flex-col items-center justify-center rounded-2xl px-18">
              <img className="h-10 w-10" src={Add} alt="" />
            </button>
          </Link>
          <p className="text-primary font-semibold">Add New List</p>
        </div>

        {/* Other Lists */}
        {lists.map((list) => (
          <div
            key={list._id}
            className="flex w-full flex-col items-center justify-start"
          >
            <Link to={`/lists/${list._id}`}>
              <div className="border-primary flex h-55 w-full flex-col items-center justify-center rounded-2xl border-2 bg-white px-10 py-2 shadow">
                {/* content */}
              </div>
            </Link>
            <p className="text-primary font-semibold">{list.title}</p>
            <p className="text-sm text-gray-500">{list.items.length} items</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSection;
