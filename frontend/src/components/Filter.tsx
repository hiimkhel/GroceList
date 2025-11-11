import React, { useState } from "react";
import Dropdown from "./Dropdown";
import FilterIcon from "../assets/Filter.svg";

const Filter: React.FC = () => {
  // Optional: keep track of selected filters
  const [availability, setAvailability] = useState("Availability");
  const [category, setCategory] = useState("Category");
  const [priceRange, setPriceRange] = useState("Price Range");

  return (
    <div className="bg-secondary/20 flex w-max flex-row gap-4 rounded-4xl py-1 pr-2 pl-4">
      {/* Filter by */}
      <div className="flex flex-row items-center justify-center gap-2">
        <img className="h-5 w-5" src={FilterIcon} alt="" />
        <p className="text-primary text-xs">Filter by...</p>
      </div>

      {/* Dropdown */}
      <div className="flex w-max items-center gap-2">
        {/* Price */}
        <Dropdown
          label="Price"
          options={[
            "₱0 – ₱50",
            "₱51 – ₱100",
            "₱101 – ₱250",
            "₱251 – ₱500",
            "₱501 – ₱1,000",
          ]}
          onSelect={(option) => setPriceRange(option)}
        />

        {/* Category */}
        <Dropdown
          label="Category"
          options={[
            "Pantry",
            "Instant Food",
            "Health & Hygiene",
            "Fruits & Vegetables",
            "Fresh Meat & Seafood",
            "Frozen Food",
            "Dairy",
            "Bakery",
            "Snacks",
            "Beverage",
          ]}
          onSelect={(option) => setCategory(option)}
        />
        {/* Availability */}
        <Dropdown
          label="Availability"
          options={["Available", "Out of Stock"]}
          onSelect={(option) => setAvailability(option)}
        />
      </div>
    </div>
  );
};

export default Filter;
