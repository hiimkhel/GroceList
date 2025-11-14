import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import { getAuthHeaders, getUserId} from "../utils/authUtils";

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

  
  if (loading) return <p>Loading list...</p>;
  if (!list) return <p>List not found.</p>;

    return(
        <div>
                <h1>This is the list page</h1>
        </div>
    )
}

export default ListPage;