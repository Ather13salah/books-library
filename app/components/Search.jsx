"use client";
function Search({ searchItem, setSearch }) {

  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search (by name or author):"
          value={searchItem}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 h-8 p-2.5 text-black rounded-lg bg-gray-100"
        />
      </div>
    </div>
  );
}

export default Search;
