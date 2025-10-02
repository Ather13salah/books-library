"use client";
import { useState } from "react";
import BookInfo from "./BookInfo";

function FavoriteOrDailyDisplay({ Books, setBooks, handleDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-row flex-wrap space-x-4">
      {Books.map((book) => (
        <div key={book.id}>
          <div
            key={book.id}
            className="flex justify-start flex-col duration-500 transition transform hover:shadow-2xl hover:scale-110 w-70 max-h-96 rounded-xl cursor-pointer"
          >
            <div
              onClick={() => setIsOpen(true)}
              className="w-full h-full flex pt-1.5 justify-center rounded-t-xl bg-gray-200 "
            >
              <img
                className="w-60 h-50  ml-2.5"
                src={book.image_url}
                loading="lazy"
                alt="book photo"
              ></img>
            </div>

            <div className="w-full h-50 bg-gray-100 rounded-b-xl">
              <h3
                dir="rtl"
                className={`text-xl ${
                  book.book_name.length > 12 && "line-clamp-1"
                } cursor-text text-black  mt-4 text-center`}
              >
                {book.book_name}
              </h3>
              <div className="w-full flex justify-between  pt-3 pr-2.5">
                <div
                  className="ml-5 hover:underline hover:text-blue-500 transition-all"
                  onClick={() => setIsOpen(true)}
                >
                  View more
                </div>
                <button
                  className="w-24 h-8 bg-red-500 text-white text-center rounded-xl cursor-pointer"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {isOpen && (
            <BookInfo
              books={Books}
              setBooks={setBooks}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              id={book.id}
              isInBooks={false}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default FavoriteOrDailyDisplay;
