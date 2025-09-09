"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import SideBar from "./components/sideBar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className=" flex  flex-col justify-center items-center w-screen min-h-screen bg-[url('/assets/background.jpg')] bg-center bg-cover ">
        <FontAwesomeIcon
          icon={faBars}
          className="duration-300 absolute font-bold top-3 left-4 cursor-pointer"
          onClick={() => setIsOpen(true)}
        ></FontAwesomeIcon>
        <div className="text-amber-50 text-5xl font-bold animate-none">
          Welcome to Maktabty
        </div>
        <div className="text-amber-50 text-2xl font-bold mt-6">
          Here you’ll find my collection, the best books, your favorites,{" "}
          <br></br>and daily reading suggestions 📖
        </div>
      </div>

      {isOpen && <SideBar setIsOpen={setIsOpen} />}
    
    </div>
  );
}
