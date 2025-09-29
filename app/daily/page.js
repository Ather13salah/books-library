"use client";
import { useEffect, useState } from "react";
import { BooksManager } from "../components/booksManager";
import BackArrow from "../components/BackArrow";
import FavoriteOrDailyDisplay from "../components/FavoriteOrDailyDisplay";
function Books() {
  const [dailyBooks, setDailyBooks] = useState([]);
  const [userId,setUserId] = useState("")
  const [loading, setLoading] = useState(false);
  const booksManager = new BooksManager();
 useEffect(()=>{
   const user_id = document.cookie.split(";")[0].split("=")[1];
   setUserId(user_id)
 },[])
  useEffect(() => {
    if(!userId) return
    setLoading(true);
    
    const getBooks = async () => {
      const getBooks = await booksManager.getDailyBooks(userId);
      if (getBooks.error) {
        setLoading(false);
        return;
      }
      setDailyBooks(getBooks.books);
      setLoading(false);
    };

    getBooks();
  }, [userId]);

  const handleDelete = async (id) => {
    const booksManager = new BooksManager();
    
    const deleteFromDaily = await booksManager.deleteFromDaily(userId, id);
    if (deleteFromDaily.error) {
      toast(deleteFromDaily.error);
      return;
    }

    setDailyBooks((prev) => prev.filter((book) => book.id !== id));
  };
  return (
    <div className="bg-white flex justify-center items-center w-screen min-h-screen">
      <BackArrow goTo="/" />

      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center ">
          <div className="w-12 h-12 border-3  border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : dailyBooks && dailyBooks.length > 0 ? (
        <div className="flex flex-col w-full h-screen p-6">
          <div className="w-full h-16 flex justify-center items-start">
            <h1 className="font-bold text-center text-2xl ">
              {" "}
              Daily Books: {dailyBooks.length}
            </h1>
          </div>
          <FavoriteOrDailyDisplay
            Books={dailyBooks}
            handleDelete={handleDelete}
          />
        </div>
      ) : (
        // this for display book card of all info
        <div className="w-full flex justify-center items-center flex-col">
          <div className="text-black text-3xl font-bold">
            <h1>No Daily Books Found</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
