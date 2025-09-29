"use client";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import Edit from "./Edit";
import { BooksManager } from "./booksManager";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faPen,
  faStar,
  faX,
} from "@fortawesome/free-solid-svg-icons";
function BookInfo({ isOpen, setIsOpen, id }) {
  const [book, setBook] = useState({});
  const [user_id, setUserId] = useState("");
  const [isOpenToEdit, setIsOpenToEdit] = useState(false);
  const booksManager = new BooksManager();
  useEffect(() => {
    setUserId(document.cookie.split(";")[0].split("=")[1]);
  }, []);
  useEffect(() => {
    const getBook = async () => {
      const getBooks = await booksManager.getBook(id);
      if (getBooks.error) {
        return;
      }
      setBook(getBooks.book);
    };

    getBook();
  }, [id]);
  const handleDaily = async (id) => {
    if (book.is_in_daily !== true) {
      const booksManager = new BooksManager();
      const setInDaily = await booksManager.setInDaily(user_id, id);

      if (setInDaily.error) {
        return;
      }
      setBook({ ...book, is_in_daily: true });
      toast("Succsses!!", {
        description: setInDaily.done,
      });
    }
  };

  const handleFavourite = async (id) => {
    if (book.is_in_daily !== true) {
      const booksManager = new BooksManager();
      const setInFavourite = await booksManager.setInFavourite(user_id, id);

      if (setInFavourite.error) {
        return;
      }
      setBook({ ...book, is_favourite: true });
      toast("Succsses!!", {
        description: setInFavourite.done,
      });
      
    }
  };

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
                <img
                  className="w-60 h-50 "
                  src={book.image_url}
                  loading="lazy"
                  alt="book photo"
                ></img>
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
                      النوع:{book.book_type}
                    </span>{" "}
                  </p>
                  <p>
                    <span lang="ar" className="font-semibold">
                      الناشر:{book.publisher}
                    </span>{" "}
                  </p>

                  <p>
                    <span lang="ar" className="font-semibold">
                      عدد الصفحات:{book.total_pages}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className=" w-full flex justify-start pt-10">
              <button
                className="duration-500 w-40 h-12 mr-5 disabled:cursor-not-allowed  disabled:opacity-[0.5] bg-black transition transform hover:shadow-2xl hover:scale-110 text-white text-center rounded-xl cursor-pointer"
                onClick={() => handleFavourite(book.id)}
                disabled={book.is_favourite}
              >
                <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
                Add to Favourite
              </button>

              <button
                onClick={() => handleDaily(book.id)}
                disabled={book.is_in_daily}
                className="duration-500 w-32 h-12 disabled:cursor-not-allowed disabled:opacity-[0.5] bg-blue-500 transition transform hover:shadow-2xl hover:scale-110 mr-5 text-white text-center rounded-xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faCalendarDay}></FontAwesomeIcon>
                Add to Daily
              </button>

              <button
                onClick={() => setIsOpenToEdit(true)}
                className="duration-500 w-32 h-12 bg-gray-500 px-2 transition transform hover:shadow-2xl  hover:scale-110 mr-5 text-white text-center rounded-xl cursor-pointer"
              >
                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                Edit
              </button>
            </div>
          </div>
        </div>
      </AlertDialogContent>
      {isOpenToEdit && (
        <Edit book={book} setBook={setBook} isOpen={isOpenToEdit} setIsOpen={setIsOpenToEdit} />
      )}
    </AlertDialog>
  );
}

export default BookInfo;
