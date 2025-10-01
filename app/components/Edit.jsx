"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { BooksManager } from "./booksManager";
function Edit({ isOpen, setBook, book, setIsOpen }) {
  const user_id = document.cookie.split(";")[0].split("=")[1];
  const [bookName, setBookName] = useState(book?.book_name);
  const [writer, setWriter] = useState(book?.writer);
  const [publisher, setPublisher] = useState(book?.publisher);
  const [category, setCategory] = useState(book?.category);
  const [total_pages, setTotalPages] = useState(book?.total_pages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    const newBook = await booksManager.editBook(
      bookName,
      writer,
      publisher,
      category,
      total_pages,
      user_id,
      book.id
    );
    if (newBook.error) {
      setError(newBook.error);
      setLoading(false);
      return;
    }
    
    setBook({
      ...book,
      book_name: bookName,
      writer: writer,
      publisher: publisher,
      category: category,
      total_pages: total_pages
    });
    setLoading(false)
    setIsOpen(false)
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Edit Book..</AlertDialogTitle>
        <div dir="rtl" className="w-full h-full flex flex-col">
          <FontAwesomeIcon
            icon={faX}
            onClick={() => setIsOpen(false)}
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
              name="book_category"
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
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Edit;
