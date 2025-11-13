import React from "react";
import Input from "../components/Input";
import SearchIcon from "../assets/Search.svg";

const Search: React.FC = () => {
  return (
    <div className="relative w-full">
      {/* Search Input */}
      <Input
        type="text"
        placeholder="Search for products..."
        icon={SearchIcon}
        iconPosition="left"
      />
    </div>
  );
};

export default Search;
