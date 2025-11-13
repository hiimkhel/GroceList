import ListSection from "../components/ListSection";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const GroceryListPage = () => {
    const [isOpen, setIsOpen] = useState(true); // state controlling sidebar
    return (
        <div className="flex">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
            <main className="flex-1 overflow-auto p-6">
                <ListSection />
            </main>
        </div>
    )
}

export default GroceryListPage;