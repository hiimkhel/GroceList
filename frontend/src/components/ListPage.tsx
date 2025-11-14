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
const ListPage: React.FC = () => {
    const { listId } = useParams();
    const [list, setList] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [itemName, setItemName] = useState("");

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
            headers: headers,
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
                <button>Clear All</button> {/* TODO: backend logic */}
            </div>
            <div>
                <div>
                    {list.items.map((item: Item) => (
                        <div className="flex">
                            <p>{item.name}</p>
                            <div>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListPage;