"use client";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import Edit from "./Edit";
import { BooksManager, getUserID } from "./booksManager";
import { useState } from "react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faPen,
  faStar,
  faX,
  faImage
} from "@fortawesome/free-solid-svg-icons";
function BookInfo({
  book,
  setBook,
  isOpen,
  books,
  setBooks,
  setIsOpen,
  isInBooks = true,
}) {
  const user_id = getUserID();
  const [isOpenToEdit, setIsOpenToEdit] = useState(false);
  const booksManager = new BooksManager();

  const handleDaily = async () => {
    if (!book?.id) return; // لو الكتاب لسه متحملش

    if (book.is_in_daily) {
      const deleteFromDaily = await booksManager.deleteFromDaily(
        user_id,
        book.id
      );
      setBook({ ...book, is_in_daily: false });
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, is_in_daily: false } : b))
      );
      toast("Succsses!!", { description: deleteFromDaily.done });
    } else {
      const setInDaily = await booksManager.setInDaily(user_id, book.id);
      if (setInDaily.error) return;
      setBook({ ...book, is_in_daily: true });
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, is_in_daily: true } : b))
      );
      toast("Succsses!!", { description: setInDaily.done });
    }
  };

  const handleFavourite = async () => {
    if (!book?.id) return;

    if (book.is_favourite) {
      const deleteFromFavourite = await booksManager.deleteFromFavourite(
        user_id,
        book.id
      );
      if (deleteFromFavourite.error) return;
      setBook({ ...book, is_favourite: false });
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, is_favourite: false } : b))
      );
      toast("Succsses!!", { description: deleteFromFavourite.done });
    } else {
      const setInFavourite = await booksManager.setInFavourite(
        user_id,
        book.id
      );
      if (setInFavourite.error) return;
      setBook({ ...book, is_favourite: true });
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, is_favourite: true } : b))
      );
      toast("Succsses!!", { description: setInFavourite.done });
    }
  };

  const editProps = {
    setBooks,
    books,
    book,
    setBook,
    isOpenToEdit,
    setIsOpenToEdit,
  };
  console.log(book);
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="min-w-lg">
        <AlertDialogTitle>Book Information</AlertDialogTitle>

        <div className="w-full h-full flex-col flex pt-1.5 justify-center items-start rounded-t-xl ">
          <FontAwesomeIcon
            icon={faX}
            onClick={() => setIsOpen(false)}
            className="fixed top-4 right-4 cursor-pointer"
          ></FontAwesomeIcon>
          <div className="flex flex-col justify-center">
            <div className="w-full flex justify-between ">
              <div className="">
                {book?.image_url ? (
                  <img
                    className="w-60 h-50"
                    src={book.image_url}
                    loading="lazy"
                    alt="book photo"
                  />
                ) : (
                  <div className="w-60 h-50 flex justify-center items-center font-bold text-2xl">
                    <FontAwesomeIcon icon={faImage}></FontAwesomeIcon>
                  </div>
                )}
              </div>
              <div className="text-black w-full text-right text-lg ml-5 flex flex-col">
                <h2
                  className={`font-bold text-lg text-gray-800 ${
                    book.book_name > 12 && "line-clamp-2"
                  }`}
                  title={book.book_name}
                >
                  {book.book_name}
                </h2>

                {/* باقي التفاصيل */}
                <div
                  dir="rtl"
                  className="text-sm text-right  text-gray-700 space-y-1"
                >
                  <p>
                    <span lang="ar" className="font-semibold">
                      المؤلف:{book.writer}
                    </span>
                  </p>
                  <p>
                    <span lang="ar" className="font-semibold">
                      التصنيف:{book.category}
                    </span>{" "}
                  </p>

                  <p>
                    <span lang="ar" className="font-semibold">
                      النوع:كتاب نصي
                    </span>{" "}
                  </p>
                  <p>
                    <span lang="ar" className="font-semibold">
                      الناشر:{book.publisher}
                    </span>{" "}
                  </p>

                  <p>
                    <span lang="ar" className="font-semibold">
                      عدد المجلدات:{book.total_pages}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
            {isInBooks && (
              <div className=" w-full flex justify-start pt-10">
                <button
                  className={`duration-500 w-40 h-12 mr-5 cursor-pointer  bg-black transition transform hover:shadow-2xl hover:scale-110 text-white text-center rounded-xl cursor-pointer"`}
                  onClick={() => handleFavourite(book.id)}
                >
                  {book.is_favourite ? (
                    "Remove from favourite"
                  ) : (
                    <div>
                      <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                      Add to Favourite
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handleDaily(book.id)}
                  className="duration-500 w-32 h-12  bg-blue-500 transition transform hover:shadow-2xl hover:scale-110 mr-5 text-white text-center rounded-xl cursor-pointer"
                >
                  {book.is_in_daily ? (
                    "Remove from daily"
                  ) : (
                    <div>
                      <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>
                      Add to Daily
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setIsOpenToEdit(true)}
                  className="duration-500 w-32 h-12 bg-gray-500 px-2 transition transform hover:shadow-2xl  hover:scale-110 mr-5 text-white text-center rounded-xl cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
        {isOpenToEdit && <Edit {...editProps} />}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default BookInfo;
