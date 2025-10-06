"use client";
import { useEffect, useState } from "react";
import { BooksManager, getUserID } from "../components/booksManager";
import BooksDisplay from "../components/BooksDisplay";
import AddBook from "../components/AddBook";
import AddBookImg from "../components/AddBookImg";
import BackArrow from "../components/BackArrow";
import { toast } from "sonner";

function Books() {
  const [Books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const booksManager = new BooksManager();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setUserId(getUserID());
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const getBooks = async () => {
      const getBooks = await booksManager.getBooks(userId);
      if (getBooks.error) {
        setLoading(false);
        return;
      }
      setBooks(getBooks.books);
      setLoading(false);
    };

    getBooks();
  }, [userId]);

  const handleChange = async (e) => {
    setLoading(true);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const newBook = await booksManager.addBook(formData, userId);

      if (newBook.error) {
        setError(newBook.error);
        setLoading(false);
        return;
      }

      if (newBook.warning) {
        setOpen(true);
        setLoading(false);
        return;
      }

      setBooks([...Books, newBook]);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex justify-center items-center w-screen min-h-screen">
      <BackArrow goTo="/" />
      {/* this section for adding errors or messages for user */}
      {error && toast(error)}
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center ">
          <div className="w-12 h-12 border-3  border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : Books && Books.length > 0 ? (
        <div className="flex flex-col w-full h-screen p-6">
          <div className="w-full h-16 flex justify-center items-start">
            <h1 className="font-bold text-center text-2xl ">
              {" "}
              All Books: {Books.length}
            </h1>
          </div>

          <details className=" fixed top-2 right-2 p-4 shadow-md ">
            <summary className="cursor-pointer text-purple-600 text-center mt-3.5 w-36  rounded-lg ">
              Add New
            </summary>
            <button
              className="cursor-pointer bg-purple-600 text-center mt-3.5 text-amber-50 w-full rounded-md "
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Manual

            </button>
            <AddBookImg
              label={"Add Image"}
              style={
                "cursor-pointer bg-purple-600 text-center mt-3.5 text-amber-50 w-full rounded-md "
              }
              handleChange={handleChange}
            />
            
          </details>
          <BooksDisplay Books={Books} setBooks={setBooks} />
        </div>
      ) : (
        // this for display book card of all info
        <div className="w-full flex justify-center items-center flex-col">
          <div className="text-black text-3xl">
            <h1>No Books Found</h1>
          </div>
          <details className="p-4 shadow-md">
            <summary className="cursor-pointer text-purple-600 text-center mt-3.5 w-36  rounded-md ">
              Add New Book
            </summary>
            <button
              className="cursor-pointer bg-purple-600 text-center mt-3.5 text-amber-50 w-full rounded-md "
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Manual

            </button>
            <AddBookImg
              label={"Add Image"}
              style={
                "cursor-pointer bg-purple-600 text-center mt-3.5 text-amber-50 w-full rounded-md "
              }
              handleChange={handleChange}
            />
            
          </details>
        </div>
      )}
      {isOpen && (
        <AddBook
          books={Books}
          setBooks={setBooks}
          isOpen={isOpen}
          setIsOpen={setOpen}
        />
      )}
    </div>
  );
}

export default Books;
