import ListSection from "../components/ListSection";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/AppNavbar";
import { useState } from "react";

const GroceryListPage = () => {
  const [isOpen, setIsOpen] = useState(true); // state controlling sidebar
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Page content */}
      <div className={`flex flex-1 flex-col transition-all duration-300`}>
        {/* Navbar */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Main content */}
        <main className="flex flex-col">
          <section className="flex flex-col gap-5 px-20 py-5">
            <ListSection />
          </section>
        </main>
      </div>
    </div>
  );
};

export default GroceryListPage;
