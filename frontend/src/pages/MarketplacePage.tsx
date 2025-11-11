import React, { useState } from "react";
import ProductsSection from "../components/ProductsSection";
import Navbar from "../components/AppNavbar";
import Sidebar from "../components/Sidebar";
import Search from "../components/Search";
import "../index.css";

const MarketPlacePage = () => {
  const [isOpen, setIsOpen] = useState(false); // state controlling sidebar
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Page content */}
      <div className={`} flex flex-1 flex-col transition-all duration-300`}>
        {/* Navbar */}
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* Main content */}
        <main className="flex flex-col">
          <section className="flex flex-col gap-5 px-20 py-5">
            <h2>Marketplace</h2>
            <div className="flex w-full flex-row">
              {/* Search.tsx */}
              <Search></Search>
              {/* Filter.tsx */}
            </div>
            <div className="border border-red-400">
              <ProductsSection></ProductsSection>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default MarketPlacePage;
