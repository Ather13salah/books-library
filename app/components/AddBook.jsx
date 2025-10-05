"use client";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { BooksManager,getUserID } from "./booksManager";
function AddBook({ isOpen, setIsOpen, books, setBooks }) {
  const [bookName, setBookName] = useState("");
  const [writer, setWriter] = useState("");
  const [publisher, setPublisher] = useState("");
  const [category, setCategory] = useState("");
  const [total_pages, setTotalPages] = useState("");
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const labelStyle = `text-lg ${
    error ? "text-red-500" : "text-black"
  } font-semibold`;
  const inputStyle = `w-full transition-all p-2 text-black h-8 bg-white ${
    error && "border-b-red-500"
  } border  border-transparent focus:outline-none focus:border-b-black `;

  const booksManager = new BooksManager();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      setUserId(getUserID());
    }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // يعرض الصورة
    }
  };
  const validateData = () => {
    if (
      bookName === "" ||
      writer === "" ||
      publisher === "" ||
      category === "" ||
      total_pages === ""
    ) {
      setError("Please, Fill all inputs");
      setLoading(false);
      return false;
    }
    if (isNaN(total_pages)){
      setError("Total pages must be number");
      setLoading(false);
      return false;
    }
    if (!image){
      setError("Image must be upload it");
      setLoading(false);
      return false;
    }
  };

  const handleSave = async () => {
    const validation = validateData()
    if (validation === false) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("book_name", bookName);
    formData.append("writer", writer);
    formData.append("publisher", publisher);
    formData.append("category", category);
    formData.append("total_pages", total_pages);
    if (image) formData.append("file", image);
    const newBook = await booksManager.addBookManually(formData,userId);
    if (newBook.error) {
      setError(newBook.error);
      setLoading(false);
      return;
    }
    setBooks([...books,newBook])

    setLoading(false);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogTitle>Add New Book..</AlertDialogTitle>
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
              name="total_pages"
              value={total_pages}
              onChange={(e) => setTotalPages(e.target.value)}
              className={inputStyle}
            />

            {preview ? (
              <div>
                <img
                  className="w-24 h-24 mt-4 bg-white"
                  src={preview}
                  alt="Book preview"
                ></img>
              </div>
            ) : (
              <div  className={`${error && 'bg-red-500 text-white underline'}`}>
                <label htmlFor="book_image" style={{"cursor":"Pointer"}} className={`${labelStyle} ${error && 'text-white'}`}>
                  {" "}
                  ارفق صورة الكتاب
                </label>
                <input
                  id="book_image"
                  type="file"
                  name="book_image"
                  className="hidden"
                  onChange={handleImageChange}
                  
                />
              </div>
            )}
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

export default AddBook;
