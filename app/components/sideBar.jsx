import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookReader,
  faClose,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { BooksManager } from "./booksManager";
import { toast } from "sonner";

function SideBar({ setIsOpen }) {
  const handleLogout = async () => {
    const booksManager = new BooksManager();
    const logOut = await booksManager.logOut();
    if (logOut.error) {
      toast(logOut.error);
      return;
    }
    toast(logOut.message);
    window.location.href = '/login'
  };
  return (
    <div className="transition-all fixed top-0 left-0 h-screen w-64 bg-black/80 text-white p-4  ">
      <FontAwesomeIcon
        icon={faClose}
        className="absolute cursor-pointer top-3 right-4"
        onClick={() => setIsOpen(false)}
      ></FontAwesomeIcon>
      <div>
        <h1 className="text-bold text-2xl">Maktabty</h1>
      </div>

      {/* this for profile page */}

      {/* this all routes of web page */}
      <div className="w-full h-full flex pt-2.5 font-bold justify-start text-xl  mt-20 flex-col">
        <Link href="/books">
          <div className="hover:text-sky-400 mt-6">
            <FontAwesomeIcon icon={faBook}></FontAwesomeIcon> Books
          </div>
        </Link>
        <Link href="/favourite">
          <div className="hover:text-sky-400 mt-6">
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Favourite
          </div>
        </Link>
        <Link href="/daily" className="hover:text-amber-400 mt-6">
          <div className="hover:text-sky-400">
            <FontAwesomeIcon icon={faBookReader}></FontAwesomeIcon> Daily Books
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="w-52 h-8 mb-2.5 rounded-lg cursor-pointer  bg-sky-400 text-white fixed bottom-0"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
