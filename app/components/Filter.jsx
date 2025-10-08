"use client";
import { useEffect, useState } from "react";

function Filter({ books, setDisplayedBooks }) {
  const categories = [];
  const [selectedCategories, setSelectedCategories] = useState([]);

    for (let i = 0; i < books.length; i++) {
      if (!categories.includes(books[i].category)) {
        categories.push(books[i].category);
      }
    }


  const handleFilter = (category, checked) => {
    let updateCategories = [];
    if (checked) {
      updateCategories = [...selectedCategories, category];
    } else {
      updateCategories = selectedCategories.filter((c) => c !== category);
    }
    setSelectedCategories(updateCategories);

    if (updateCategories.length === 0) {
      setDisplayedBooks(books);
      return;
    }

    const filtered = books.filter((book) => book.category === category);
    setDisplayedBooks(filtered);
  };

  return (
    <div>
      <details className="text-purple-500 flex flex-col text-center mt-3.5 w-36 fixed top-2 right-52 shadow-md">
        <summary>Filter</summary>
        <div dir="rtl" className="w-full h-auto flex flex-col p-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                onChange={(e) => handleFilter(category, e.target.checked)}
                id={category}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}

export default Filter;
