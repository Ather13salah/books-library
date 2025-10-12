"use client";
import { useEffect, useState } from "react";
import { BooksManager, getUserID } from "../components/booksManager";
import BooksDisplay from "../components/BooksDisplay";
import AddBook from "../components/AddBook";
import BackArrow from "../components/BackArrow";
import { toast } from "sonner";
import Filter from "../components/Filter";
import Search from "../components/Search";
import AddChoices from "../components/AddChoices";
import ViewBookInfo from "../components/ViewBookInfo";

function Books() {
  const [Books, setBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState(Books);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newBook, setNewBook] = useState({});
  const [error, setError] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isOpenToView, setIsOpenToView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchItem, setSearch] = useState("");
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
      setDisplayedBooks(getBooks.books);
      setLoading(false);
    };

    getBooks();
  }, [userId]);



  useEffect(() => {
    let filtered = [...Books];

    // apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((book) =>
        selectedCategories.includes(book.category)
      );
    }

    // apply search filter
    if (searchItem.trim() !== "") {
      filtered = filtered.filter(
        (book) =>
          book.book_name?.toLowerCase().includes(searchItem.toLowerCase()) ||
          book.writer?.toLowerCase().includes(searchItem.toLowerCase())
      );
    }

    setDisplayedBooks(filtered);
  }, [Books, selectedCategories, searchItem]);

  const handleChange = async (e) => {
    setLoading(true);
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      const book = await booksManager.uploadImage(formData, userId);

      if (book.error) {
        setError(book.error);
        setLoading(false);
        return;
      }

      setNewBook(book);
      setIsOpenToView(true);
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
        <div className="flex flex-col w-screen h-screen p-8">
          <div className="w-full h-16 flex justify-between items-start">
            <div className="font-bold w-44 mr-3 text-center text-2xl ">
              {" "}
              All Books: {displayedBooks.length}
            </div>
            <div className="w-full">
              <AddChoices handleChange={handleChange} setOpen={setOpen} />
              <Filter
                books={Books}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
              <Search searchItem={searchItem} setSearch={setSearch} />
            </div>
          </div>

          <BooksDisplay Books={displayedBooks} setBooks={setBooks} />
        </div>
      ) : (
        // this for display book card of all info
        <div className="w-full flex justify-center items-center flex-col">
          <div className="text-black font-bold text-3xl">
            <h1>No Books Found</h1>
          </div>
          <AddChoices handleChange={handleChange} setOpen={setOpen} />
        </div>
      )}
      {isOpen && (
        <AddBook
          books={Books}
          setBooks={setBooks}
          displayedBooks={setDisplayedBooks}
          isOpen={isOpen}
          setIsOpen={setOpen}
        />
      )}
      {isOpenToView && (
        <ViewBookInfo
          book={newBook}
          books={Books}
          setBooks={setBooks}
          displayedBooks={setDisplayedBooks}
          isOpenToview={isOpenToView}
          setIsOpenToView={setIsOpenToView}
        />
      )}
    </div>
  );
}

export default Books;
