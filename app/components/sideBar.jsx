import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookSkull,
  faCircleUser,
  faClose,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
function SideBar({ setIsOpen }) {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-black/80 text-white p-4  ">
      <FontAwesomeIcon
        icon={faClose}
        className="absolute cursor-pointer top-3 right-4"
        onClick={() => setIsOpen(false)}
      ></FontAwesomeIcon>
      <div>
        <h1 className="text-bold text-2xl">Maktabty</h1>
      </div>

      {/* this for profile page */}
      <Link href={"/profile"}>
        {" "}
        <div className="flex justify-between mt-6 text-2xl font-bold cursor-pointer ">
          <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>
        </div>
      </Link>

      {/* this all routes of web page */}
      <div className="w-full h-full flex pt-2.5 font-bold justify-start  mt-20 flex-col">
        <Link href="/books">
          <div className="hover:text-amber-400">
            <FontAwesomeIcon icon={faBookSkull}></FontAwesomeIcon> Books
          </div>
        </Link>
        <Link href="/favourite">
          <div className="hover:text-amber-400">
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon> Favourite
          </div>
        </Link>
        <Link href="/daily" className="hover:text-amber-400">
          <div className="hover:text-amber-400">
            <FontAwesomeIcon icon={faBook}></FontAwesomeIcon> Daily Books
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
