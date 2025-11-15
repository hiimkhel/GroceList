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
import ListItem from "../components/ListItem";
const API_BASE = import.meta.env.VITE_API_BASE;
interface Item {
  _id: string;
  name: string;
  quantity: number;
  isChecked: boolean;
}
const ListPage: React.FC = () => {
  const { listId } = useParams();
  const [list, setList] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [itemName, setItemName] = useState("");
  const [isOpen, setIsOpen] = useState(false); // state controlling sidebar

  // States for item edit
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");

  const [items, setItems] = useState<Item[]>([]);

  const headers = getAuthHeaders();
  const userId = getUserId();

  const fetchList = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/lists/${userId}/${listId}`);
      const data = await res.json();

      setList(data);
      setItems(data.items);
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


  // Function to handle the checkbox of each item
  // Toggle + resort
  const toggleItem = async (id: string, checked: boolean) => {
    // Optimistic UI update
    setList((prev: any) => ({
      ...prev,
      items: prev.items
        .map((item: Item) =>
          item._id === id ? { ...item, isChecked: checked } : item
        )
        .sort((a: Item, b: Item) => Number(a.isChecked) - Number(b.isChecked)),
    }));

    try {
      const response = await fetch(
        `${API_BASE}/api/lists/${userId}/${listId}/toggle-check/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: JSON.stringify({ isChecked: checked }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toastr.success("Item updated!");
      fetchList(); // refresh from backend to be safe
    } catch (err) {
      toastr.error("Failed to update item!");
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
            <div className="flex w-full flex-col gap-2">
              {list.items
                .sort((a: Item, b: Item) => Number(a.isChecked) - Number(b.isChecked)) // sorting!!
                .map((item: Item) => (
                  <ListItem
                    key={item._id}
                    item={item}
                    onToggle={toggleItem}
                    onDelete={handleItemDelete}
                    onEdit={handleSaveEdit}
                  />
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListPage;
