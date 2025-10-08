'use client';
import  { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function Search({ books,setDisplayedBooks }) {
 const [searchItem, setSearch] = useState("");

  const handleSearch = () => {
    if (searchItem.trim() === "") {
      setDisplayedBooks(books);
      return;
    }

    const filtered = books.filter((book) =>
      book.book_name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setDisplayedBooks(filtered);
  };

  // 🔹 هنا نخلّي البحث يشتغل كل ما المستخدم يكتب
  useEffect(() => {
    handleSearch();
  }, [searchItem]);
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search:"
          value={searchItem}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-56 h-8 p-2.5 text-black rounded-lg bg-gray-100"
        />
        <div className="bg-gray-100 ml-1.5 w-12 cursor-pointer rounded-lg h-8 text-center text-xl hover:text-purple-600">
          {" "}
          <FontAwesomeIcon onClick={handleSearch} className="" icon={faSearch}></FontAwesomeIcon>
        </div>
      </div>
      
      </div>
  );
}

export default Search;
