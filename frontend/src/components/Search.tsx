import React from "react";
import Input from "../components/Input";
import SearchIcon from "../assets/Search.svg";

type SearchProps = {
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({
  placeholder = "Search...",
  onChange,
}) => {
  return (
    <div className="relative w-full">
      <Input
        type="text"
        placeholder={placeholder}
        icon={SearchIcon}
        iconPosition="left"
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
