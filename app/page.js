"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./components/sideBar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`https://library-m2k0.onrender.com/auth/me`, {
          credentials: "include",
        });

        // صفحات تسجيل الدخول والتسجيل
        const isAuthPage = pathname === "/login" || pathname === "/signup";

        if (res.status === 200) {
          // لو المستخدم داخل بالفعل لكن واقف على صفحة login → رجعه للرئيسية
          if (isAuthPage) {
            router.replace("/");
          }
        } else {
          // لو مش داخل وبيحاول يدخل صفحة محمية → رجعه لصفحة login
          if (!isAuthPage) {
            router.replace("/login");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, router]);
  return (
    <div>
      {loading ? (
        <div className=" bg-white w-12 h-12 animate-spin border-purple-500  rounded-full "></div>
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-black bg-[url('/assets/background.jpg')] bg-center bg-cover">
          {" "}
          <div className="   ">
            <FontAwesomeIcon
              icon={faBars}
              className="duration-300 absolute text-amber-50 font-bold top-3 left-4 cursor-pointer"
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
        </div>
      )}

      {isOpen && <SideBar setIsOpen={setIsOpen} />}
    </div>
  );
}
