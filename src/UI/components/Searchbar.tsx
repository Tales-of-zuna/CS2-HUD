import { useState } from "react";
import { MdSearch, MdClose } from "react-icons/md";

interface SearchBarProps {
  dataSearch: (searchValue: string) => void;
}

export const Searchbar = ({ dataSearch }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue: string = event.target.value;
    setSearchValue(searchValue);
    dataSearch(searchValue);
  };

  const clearSearchInput = () => {
    setSearchValue("");
    dataSearch("");
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        id="Search"
        className="noDrag text-textcolor relative flex size-full items-center justify-center gap-2 rounded bg-background-secondary px-2 text-sm"
      >
        <MdSearch className="size-6" />
        <input
          type="text"
          placeholder="Search"
          className="w-full border-none bg-transparent focus:outline-none focus:ring-0"
          onChange={handleSearch}
          value={searchValue}
        />
        {searchValue.length === 0 ? null : (
          <MdClose
            id="clearSearch"
            className="absolute right-2 cursor-pointer"
            onClick={clearSearchInput}
          />
        )}
      </div>
    </div>
  );
};
