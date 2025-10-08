"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { BooksManager, getUserID } from "./booksManager";
function ViewBookInfo({
  isOpenToview,
  books,
  setBooks,
  book,
  setIsOpenToView,
}) {
  const user_id = getUserID();
  const [bookName, setBookName] = useState(book?.book_name);
  const [writer, setWriter] = useState(book?.writer);
  const [publisher, setPublisher] = useState(book?.publisher);
  const [category, setCategory] = useState(book?.category);
  const [total_pages, setTotalPages] = useState(book?.total_pages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let id = book.id;
  const labelStyle = `text-lg ${
    error ? "text-red-500" : "text-black"
  } font-semibold`;
  const inputStyle = `w-full transition-all p-2 text-black h-8 bg-white ${
    error && "border-b-red-500"
  } border  border-transparent focus:outline-none focus:border-b-black `;

  const handleSave = async () => {
    const booksManager = new BooksManager();
    setLoading(true);
    if (
      bookName === "" ||
      writer === "" ||
      publisher === "" ||
      category === "" ||
      total_pages === ""
    ) {
      setError("Please, Fill all inputs");
      setLoading(false);
      return;
    }

    const newBook = await booksManager.addBook(
      bookName,
      writer,
      publisher,
      category,
      total_pages,
      book.image_url,
      user_id,
      id
    );
    if (newBook.error) {
      setError(newBook.error);
      setLoading(false);
      return;
    }
    setBooks(prevBooks => [...prevBooks, newBook]);
    setLoading(false);
    setIsOpenToView(false);
  };
  return (
    <AlertDialog open={isOpenToview} onOpenChange={setIsOpenToView}>
      <AlertDialogContent>
        <AlertDialogTitle>Book Information..</AlertDialogTitle>
        <div dir="rtl" className="w-full h-full flex flex-col">
          <FontAwesomeIcon
            icon={faX}
            onClick={() => setIsOpenToView(false)}
            className="fixed top-4 right-4 cursor-pointer"
          ></FontAwesomeIcon>

          {error && (
            <p className="transition-all duration-300 text-xl text-center text-red-500">
              {error}
            </p>
          )}
          <form className="w-full h-full flex flex-col">
            <label className={labelStyle}>الاسم:</label>
            <input
              dir="rtl"
              type="text"
              name="book_name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              className={inputStyle}
            />

            <label className={labelStyle}>المؤلف:</label>
            <input
              dir="rtl"
              type="text"
              name="book_writer"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              className={inputStyle}
            />

            <label className={labelStyle}>الناشر:</label>
            <input
              dir="rtl"
              type="text"
              name="book_publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              className={inputStyle}
            />

            <label className={labelStyle}>التصنيف:</label>
            <input
              dir="rtl"
              type="text"
              name="book_category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputStyle}
            />

            <label className={labelStyle}>عدد الصفحات:</label>
            <input
              dir="rtl"
              type="text"
              name="total_pages"
              value={total_pages}
              onChange={(e) => setTotalPages(e.target.value)}
              className={inputStyle}
            />
          </form>
        </div>
        <div className="px-3" dir="ltr">
          <button
            className="active:opacity-[0.5] mr-3 w-24 h-8 text-center cursor-pointer bg-black rounded-lg text-white"
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            className="w-24 h-8 bg-gray-100 rounded-lg text-center cursor-pointer text-black"
            onClick={() => setIsOpenToView(false)}
          >
            Cancel
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ViewBookInfo;
