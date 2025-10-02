"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import {
  faCalendarDay,
  faTrash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { BooksManager, getUserID } from "./booksManager";
import { useState } from "react";
import BookInfo from "./BookInfo";

function BooksDisplay({ Books, setBooks }) {
  const user_id = getUserID();
  const [isOpen, setIsOpen] = useState(false);
  const [bookId, setBookId] = useState("");
  const booksManager = new BooksManager();

  // 🗑️ Delete
  const handleDelete = async (book_id) => {
    const deleteBook = await booksManager.deleteBooks(user_id, book_id);
    if (deleteBook.error) return;

    const copyBooks = Books.filter((book) => book.id !== book_id);
    setBooks(copyBooks);

    toast("Success!!", { description: deleteBook.done });
  };

  // ⭐ Favourite
  const handleFavourite = async (book_id) => {
    let copyBooks = [...Books];

    for (let i = 0; i < copyBooks.length; i++) {
      if (copyBooks[i].id === book_id) {
        if (copyBooks[i].is_favourite) {
          const res = await booksManager.deleteFromFavourite(user_id, book_id);
          if (res.error) return;

          copyBooks[i] = { ...copyBooks[i], is_favourite: false };
          toast("Success!!", { description: res.done });
        } else {
          const res = await booksManager.setInFavourite(user_id, book_id);
          if (res.error) return;

          copyBooks[i] = { ...copyBooks[i], is_favourite: true };
          toast("Success!!", { description: res.done });
        }
        break; // نوقف اللوب بعد ما نلاقي الكتاب
      }
    }

    setBooks(copyBooks);
  };

  // 📅 Daily
  const handleDaily = async (book_id) => {
    let copyBooks = [...Books];

    for (let i = 0; i < copyBooks.length; i++) {
      if (copyBooks[i].id === book_id) {
        if (copyBooks[i].is_in_daily) {
          const res = await booksManager.deleteFromDaily(user_id, book_id);
          if (res.error) return;

          copyBooks[i] = { ...copyBooks[i], is_in_daily: false };
          toast("Success!!", { description: res.done });
        } else {
          const res = await booksManager.setInDaily(user_id, book_id);
          if (res.error) return;

          copyBooks[i] = { ...copyBooks[i], is_in_daily: true };
          toast("Success!!", { description: res.done });
        }
        break; // نوقف اللوب بعد التحديث
      }
    }

    setBooks(copyBooks);
  };

  const handleOpen = (book_id) => {
    setBookId(book_id);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-row min-h-[250px] flex-wrap space-x-4">
      {Books.map((book) => (
        <div key={book.id}>
          <div className="flex justify-start flex-col duration-500 transition transform hover:shadow-2xl hover:scale-110 w-70 h-9/12 rounded-xl cursor-pointer">
            <div
              onClick={() => handleOpen(book.id)}
              className="w-full h-full flex pt-1.5 justify-center rounded-t-xl bg-gray-200 "
            >
              {book?.image_url && (
                <img
                  className="w-60 h-50"
                  src={book.image_url}
                  loading="lazy"
                  alt="book photo"
                />
              )}
            </div>

            <div className="w-full h-50 bg-gray-100 rounded-b-xl">
              <h3
                dir="rtl"
                className={`text-xl ${
                  book.book_name.length > 12 && "line-clamp-1"
                } text-center cursor-text text-black mt-4`}
              >
                {book.book_name}
              </h3>
              <p className="text-lg cursor-text text-center text-black">
                تصنيف: {book.category}
              </p>
              <div className="w-full h-12 mt-6 text-2xl flex justify-between">
                <div className="text-lg ml-1.5 hover:underline hover:text-blue-500 transition-all">
                  <div onClick={() => handleOpen(book.id)}>View more</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    onClick={() => handleFavourite(book.id)}
                    className={`mr-4 cursor-pointer ${
                      book.is_favourite ? "text-yellow-400" : "text-gray-400"
                    }`}
                    icon={faStar}
                  />

                  <FontAwesomeIcon
                    onClick={() => handleDaily(book.id)}
                    className={`mr-4 cursor-pointer ${
                      book.is_in_daily ? "text-blue-400" : "text-gray-400"
                    }`}
                    icon={faCalendarDay}
                  />

                  <FontAwesomeIcon
                    onClick={() => handleDelete(book.id)}
                    className="mr-4 text-red-600"
                    icon={faTrash}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isOpen && (
        <BookInfo
          books={Books}
          setBooks={setBooks}
          isOpen={isOpen}
          id={bookId}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

export default BooksDisplay;
