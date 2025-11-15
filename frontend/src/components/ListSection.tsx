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
        <Search></Search>
        <Button variant="primary" size="md" className="w-50">
          Set an Active List
        </Button>
      </div>
      {/* Display all lists with active and add new */}
      <div className="mt-4 grid w-auto grid-cols-2 gap-4 md:grid-cols-5 md:gap-x-2 md:gap-y-4">
        {/* Add Button */}
        <div className="flex w-max flex-col items-center justify-center">
          <Link to="/lists/add">
            <button className="bg-secondary flex h-45 w-40 cursor-pointer flex-col items-center justify-center rounded-2xl">
              <img src={Add} alt="" />
            </button>
          </Link>
          <p className="text-primary font-semibold">Add New List</p>
        </div>

        {/* Other Lists */}
        <div>
          {lists.map((list) => (
            <Link to={`/lists/${list._id}`} key={list._id}>
              <h4>{list.title}</h4>
              <p>{list.items.length} items</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListSection;
