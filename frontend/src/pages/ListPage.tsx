import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAuthHeaders, getUserId } from "../utils/authUtils";
import Input from "../components/Input";
import Arrow from "../assets/Arrow.svg";
import Button from "../components/Button";
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
import Navbar from "../components/AppNavbar";
import Sidebar from "../components/Sidebar";
import toastr from "toastr";
const API_BASE = import.meta.env.VITE_API_BASE;
interface Item {
  _id: string;
  name: string;
  quantity: number;
  isChecked: boolean;
}
const ListPage: React.FC<Item> = () => {
  const { listId } = useParams();
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [itemName, setItemName] = useState("");
  const [isOpen, setIsOpen] = useState(false); // state controlling sidebar

  // States for item edit
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  const headers = getAuthHeaders();
  const userId = getUserId();

  const fetchList = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/lists/${userId}/${listId}`);
      const data = await res.json();

      setList(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Function to handle adding item to user's grocery list
  const handleAddItem = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/api/lists/${userId}/${listId}/add-item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({
            item: {
              name: itemName,
              quantity: 1,
            },
          }),
        },
      );

      const data = await response.json();
      // Error handling
      if (!response.ok) throw new Error(data.message || "Adding item failed");

      toastr.success("Item added to list!");
      setItemName(""); // clear input
      fetchList(); // refresh list instead of redirect
    } catch (err) {
      toastr.error("Failed to add item!")
      console.error(err);
    }
  };

  // Function to handle the backend request to delete the list
  const handleDeleteList = async () => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to remove "${name}" list? `,
      );
      if (confirmDelete) {
        const response = await fetch(
          `${API_BASE}/api/lists/${userId}/${listId}/delete`,
          {
            method: "DELETE",
            headers: headers,
          },
        );
        const data = await response.json();

        // Error handling
        if (!response.ok) throw new Error(data.message || "Adding item failed");
        toastr.success("Item deleted!");
        fetchList();
      }
      return;
    } catch (err) {
      toastr.error("Item deletion failed!")
      console.error(err);
    }
  };

  // Function to handle backend request to delete an item from user's list
  const handleItemDelete = async (name: string, id: string) => {
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to remove "${name}" from the list?`,
      );
      if (!confirmDelete) return;

      const response = await fetch(
        `${API_BASE}/api/lists/${userId}/${listId}/delete-item/${id}`,
        {
          method: "DELETE",
          headers: headers,
        },
      );

      const data = await response.json();
      // Error handling
      if (!response.ok) throw new Error(data.message || "Adding item failed");
      toastr.success("Item deleted!");


      fetchList();
    } catch (Err) {
      toastr.error("Deleting item failed!");
      console.error(Err);
    }
  };

  // Item Editing Helper function
  const startEditing = (item: Item) => {
    setEditingItemId(item._id);
    setEditedName(item.name);
    fetchList();
  };

  // Function to handle edit
  const handleSaveEdit = async (id: string) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/lists/${userId}/${listId}/edit-item/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({ name: editedName }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toastr.success("Item edited!");
      setEditingItemId(null);
      fetchList();
    } catch (err) {
      toastr.error("Failed to edit item!");
      console.error(err);
    }
  };

  //Handle toggle checkbox
  const handleToggleCheck = async (id: string, isChecked: boolean) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/lists/${userId}/${listId}/toggle-check/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({ isChecked }),
        },
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      fetchList();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading list...</p>;
  if (!list) return <p>List not found.</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Page content */}
      <div className={`flex flex-1 flex-col transition-all duration-300`}>
        {/* Navbar */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Main content */}
        <main className="flex flex-col gap-5 px-20 py-5">
          <div className="flex w-full flex-row items-center gap-3">
            <Link to="/lists">
              <img src={Arrow} alt="Back" className="h-4 w-6" />
            </Link>
            <h2>Your Lists</h2>
          </div>

          <h3 className="text-primary text-3xl">{list.title}</h3>
          {/* Item name input field, Add item button, and Clear all button */}
          <div className="flex flex-row gap-2">
            <Input
              type="text"
              placeholder="Enter item name..."
              value={itemName}
              onChange={(e) => setItemName(e.target.value)
              }
            />
            <Button variant="primary" className="w-30" onClick={handleAddItem}>
              Add Item
            </Button>
            <Button
              variant="outline"
              className="w-32"
              onClick={handleDeleteList}
            >
              Delete List
            </Button>{" "}
            {/* TODO: backend logic */}
          </div>

          {/* ITEM */}
          <div className="flex w-full flex-col gap-2">
            {list.items.map((item: Item, index: number) => (
              <div
                key={item._id}
                className={`flex w-full flex-row items-center justify-between rounded-4xl px-4 py-2 ${
                  index % 2 === 0 ? "bg-[#F7F7F7]" : "bg-[#E3F8F0]"
                }`}
              >
                {editingItemId === item._id ? (
                  // EDIT MODE
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-max border px-2"
                  />
                ) : (
                  // VIEW MODE
                  <div className="flex items-center gap-3">
                    <label className="flex cursor-pointer items-center gap-3 select-none">
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        onChange={() =>
                          handleToggleCheck(item._id, !item.isChecked)
                        }
                        className="peer sr-only"
                      />

                      {/* Custom checkbox */}
                      <span className="border-secondary peer-checked:border-secondary h-5 w-5 rounded border-2 transition-all duration-200"></span>

                      {/* Item name */}
                      <p className="peer-checked:text-black-300 peer-checked:line-through">
                        {item.name}
                      </p>
                    </label>
                  </div>
                )}

                <div className="flex flex-row gap-2">
                  {editingItemId === item._id ? (
                    <>
                      <Button
                        className="flex flex-row items-center justify-center gap-1 rounded-3xl border-none shadow-sm"
                        variant="primary"
                        onClick={() => handleSaveEdit(item._id)}
                      >
                        Save
                      </Button>
                      <Button
                        className="flex flex-row items-center justify-center gap-1 rounded-3xl border-none bg-white text-black shadow-sm"
                        variant="outline"
                        onClick={() => setEditingItemId(null)}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="flex flex-row items-center justify-center gap-1 rounded-3xl border-none bg-white text-black shadow-sm"
                        variant="outline"
                        icon={Edit}
                        iconPosition="left"
                        onClick={() => startEditing(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="flex flex-row items-center justify-center gap-1 rounded-3xl border-none bg-red-500 shadow-sm"
                        variant="primary"
                        icon={Delete}
                        iconPosition="left"
                        onClick={() => handleItemDelete(item.name, item._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListPage;
