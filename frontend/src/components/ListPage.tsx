import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { getAuthHeaders, getUserId} from "../utils/authUtils";
import Input from "../components/Input";
import Button from "./Button";

const API_BASE = import.meta.env.VITE_API_BASE;
interface Item{
    _id: string,
    name: string;
    quantity: number;
    isChecked: boolean;
}
const ListPage: React.FC<Item> = () => {
    const { listId } = useParams();
    const [list, setList] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [itemName, setItemName] = useState("");

    // States for item edit
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editedName, setEditedName] = useState("");

  const headers = getAuthHeaders();
  const userId = getUserId();

  const fetchList = async () => {
    try{
        const res = await fetch(`${API_BASE}/api/lists/${userId}/${listId}`);
        const data = await res.json();

        setList(data);
        console.log(data);
    }catch(err){
        console.error(err);
    }finally{
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  // Function to handle adding item to user's grocery list
  const handleAddItem = async () => {
    try{
        const response = await fetch(`${API_BASE}/api/lists/${userId}/${listId}/add-item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            body: JSON.stringify({
                item: {
                    name: itemName,
                    quantity: 1
                }
            })
        });

        const data = await response.json();
        // Error handling 
       if (!response.ok) throw new Error(data.message || "Adding item failed");
        
        setItemName("");   // clear input
        fetchList();       // refresh list instead of redirect
    }catch(err){
        console.error(err);
    }
  }

  // Function to handle the backend request to delete the list
  const handleDeleteList = async  () => {
    try{
        const confirmDelete = window.confirm(
            `Are you sure you want to remove "${name}" list? `
        )
        if(confirmDelete){
            const response = await fetch(`${API_BASE}/api/lists/${userId}/${listId}/delete`, {
                method: "DELETE",
                headers: headers
            });
            const data = await response.json();

            // Error handling 
            if (!response.ok) throw new Error(data.message || "Adding item failed");
            console.log("");
            window.location.href = "/lists"
        }
        return;
    }catch(err){
        console.error(err);
    }
  }

  // Function to handle backend request to delete an item from user's list
  const handleItemDelete = async (name: string, id: string) => {
    try{
        const confirmDelete = window.confirm(
            `Are you sure you want to remove "${name}" from the list?`
        );
        if (!confirmDelete) return;

        const response = await fetch(`${API_BASE}/api/lists/${userId}/${listId}/delete-item/${id}`,
            {
                method: "DELETE",
                headers: headers
            }
        );

        const data = await response.json();
        // Error handling 
        if (!response.ok) throw new Error(data.message || "Adding item failed");
        console.log("");
        
        window.location.href = `/lists/${listId}`
    }catch(Err){
        console.error(Err);
    }
  }

    // Item Editing Helper function
    const startEditing = (item: Item) => {
        setEditingItemId(item._id);
        setEditedName(item.name);
        fetchList();
    };


    // Function to handle edit
    const handleSaveEdit = async (id: string) => {
        try {
            const response = await fetch(`${API_BASE}/api/lists/${userId}/${listId}/edit-item/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...headers
                },
                body: JSON.stringify({ name: editedName })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setEditingItemId(null);
            fetchList();
        } catch (err) {
            console.error(err);
        }
    };


  if (loading) return <p>Loading list...</p>;
  if (!list) return <p>List not found.</p>;

    return(
        <div>
            <h2>{list.title}</h2>

            {/* Item name input field, Add item button, and Clear all button */}
            <div className="flex">
                <Input type="text" placeholder="Enter item name..." value={itemName} onChange={(e => setItemName(e.target.value))} />
                
                <Button onClick={handleAddItem}>
                    Add Item
                </Button>
                <button onClick={handleDeleteList}>Delete List</button> {/* TODO: backend logic */}
            </div>
            <div>
                <div>
                    {list.items.map((item: Item) => (
                        <div className="flex" key={item._id}>
                            
                            {editingItemId === item._id ? (
                                // EDIT MODE
                                <input
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="border px-2"
                                />
                            ) : (
                                // VIEW MODE
                                <p>{item.name}</p>
                            )}

                            <div>
                                {editingItemId === item._id ? (
                                    <>
                                        <button onClick={() => handleSaveEdit(item._id)}>Save</button>
                                        <button onClick={() => setEditingItemId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => startEditing(item)}>Edit</button>
                                        <button onClick={() => handleItemDelete(item.name, item._id)}>Delete</button>
                                    </>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListPage;