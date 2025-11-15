import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import Button from "../components/Button";
import Input from "../components/Input";
import Add from "../assets/Add.svg";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { getUserId, getAuthHeaders } from "../utils/authUtils";

const API_BASE = import.meta.env.VITE_API_BASE;

interface GroceryList {
  _id: string;
  title: string;
  items: { _id: string; name: string; quantity: number; isChecked: boolean }[];
  updatedAt: Date;
  isActive: boolean;
}

const ListSection: React.FC = () => {
  const [lists, setLists] = useState<GroceryList[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [title, setTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userId = getUserId();
  const headers = getAuthHeaders();

  const redirect = useNavigate();
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
      redirect("/lists");

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

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
      <div className="mt-4 grid w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 sm:gap-x-4 sm:gap-y-4">
        {/* Add Button */}
        <div className="flex w-full flex-col items-center justify-start gap-1">
          {/* <Link to="/lists/add"> */}
          <button
            className="bg-secondary flex h-45 w-full cursor-pointer flex-col items-center justify-center rounded-2xl px-18 shadow-md"
            onClick={() => setIsDialogOpen(true)}
          >
            <img className="h-10 w-10" src={Add} alt="" />
          </button>
          {/* </Link> */}
          <p className="text-primary font-semibold">Add New List</p>
        </div>

        {/* Dialog */}
        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold">
              Add New List
            </Dialog.Title>

            <div className="mt-4 flex flex-col gap-4">
              <Input
                type="text"
                placeholder="List title"
                className="w-full rounded-lg border border-gray-300 px-4 py-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                className="bg-primary cursor-pointer rounded-lg px-4 py-2 text-white"
                onClick={async () => {
                  await createNewList();
                  setIsDialogOpen(false);
                  fetchLists();
                }}
              >
                Create List
              </button>
            </div>
          </Dialog.Panel>
        </Dialog>
        {/* Other Lists */}
        {lists.map((list) => (
          <div
            key={list._id}
            className="flex w-full flex-col items-center justify-start"
          >
            <Link to={`/lists/${list._id}`}>
              <div className="border-primary flex h-45 w-40 flex-col items-start justify-start overflow-y-auto border-2 bg-white p-3 shadow-md">
                {list.items.map((item) => (
                  <label key={item._id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.isChecked}
                      readOnly
                      className="h-4 w-4"
                    />
                    <span
                      className={
                        item.isChecked ? "text-gray-400 line-through" : ""
                      }
                    >
                      {item.name}
                    </span>
                  </label>
                ))}
              </div>
            </Link>

            {/* Title + Active Badge */}
            <p className="text-primary mt-1 flex items-center gap-2 font-semibold">
              {list.isActive && (
                <span className="bg-secondary rounded-full px-2 py-0.5 text-xs">
                  Active
                </span>
              )}
              {list.title}
            </p>

            {/* Date and Time */}
            <p className="flex items-center gap-2 text-xs text-gray-500">
              {new Date(list.updatedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}

              {/* Small circle separator */}
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400" />

              {new Date(list.updatedAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSection;
