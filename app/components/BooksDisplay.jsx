"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "sonner";
import {
  faCalendarDay,
  faTrash,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { BooksManager } from "./booksManager";
import { useState } from "react";
import BookInfo from "./BookInfo";

function BooksDisplay({ Books, setBooks }) {
  const user_id = document.cookie.split(";")[0].split("=")[1];
  const [isOpen, setIsOpen] = useState(false);
  const [bookId, setBookId] = useState("");

  const handleDelete = async (book_id) => {
    const booksManager = new BooksManager();

    const deleteBook = await booksManager.deleteBooks(user_id, book_id);
    if (deleteBook.error) {
      return;
    }

    let copyBooks = [...Books];
    copyBooks = Books.filter((book) => book.id !== book_id);
    setBooks(copyBooks);
    toast("Succsses!!", {
      description: deleteBook.done,
    });
  };
  const handleFavourite = (book_id) => {
    const booksManager = new BooksManager();
    Books.map(async (book, index) => {
      if (book.id == book_id) {
        const setBookInFavourite = await booksManager.setInFavourite(
          user_id,
          book_id
        );

        if (book.is_favourite === true) {
          toast("Book already in favourite books");
          return;
        }
        if (setBookInFavourite.error) {
          return;
        }
        let copyBooks = [...Books];
        copyBooks[index] = { ...copyBooks[index], is_favourite: true };
        setBooks(copyBooks);
        toast("Succsses!!", {
          description: setBookInFavourite.done,
        });
      }
    });
  };
  const handleDaily = (book_id) => {
    const booksManager = new BooksManager();
    Books.map(async (book, index) => {
      if (book.id == book_id) {
        if (book.is_in_daily === true) {
          toast("Book already in daily books");
          return;
        }
        const setBookInDaily = await booksManager.setInDaily(user_id, book_id);
        if (setBookInDaily.error) {
          return;
        }
        let copyBooks = [...Books];
        copyBooks[index] = { ...copyBooks[index], is_in_daily: true };
        setBooks(copyBooks);
        toast("Succsses!!", {
          description: setBookInDaily.done,
        });
      }
    });
  };
  const handleOpen = (book_id) => {
    Books.map(async (book) => {
      if (book.id == book_id) {
        setBookId(book_id);
        setIsOpen(true);
      }
    });
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
              <img
                className="w-60 h-50  ml-2.5"
                src={book.image_url}
                loading="lazy"
                alt="book photo"
              ></img>
            </div>

            <div className="w-full h-50  bg-gray-100 rounded-b-xl">
              <h3
                className={`text-xl ${
                  book.book_name.length > 12
                    &&  "line-clamp-1"
                   
                }  text-center cursor-text text-black mt-4`}
              >
                {book.book_name}
              </h3>
              <div>
                <p className="text-lg cursor-text text-center text-black">
                  تصنيف: {book.category}
                </p>
              </div>
              <div className="w-full  h-12 mt-6 text-2xl flex justify-between">
                <div className="text-lg ml-1.5 hover:underline hover:text-blue-500 transition-all">
                  <div onClick={() => handleOpen(book.id)}>View more</div>
                </div>
                <div>
                  <FontAwesomeIcon
                    onClick={() => handleFavourite(book.id)}
                    className="mr-4"
                    icon={faStar}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    onClick={() => handleDaily(book.id)}
                    className="mr-4 text-blue-400"
                    icon={faCalendarDay}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    onClick={() => handleDelete(book.id)}
                    className="mr-4 text-red-600"
                    icon={faTrash}
                  ></FontAwesomeIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isOpen && <BookInfo isOpen={isOpen} id={bookId} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default BooksDisplay;
