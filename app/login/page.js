"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username || !password) {
      setLoading(false);
      setError("Please fill all  the inputs");
      return;
    }
    if (password.length < 8) {
      setLoading(false);
      setError("Password at least has 8 characters");
      return;
    }
    try {
      const request = await fetch(
        "https://library-m2k0.onrender.com/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            password: password,
          }),
        }
      );

      const response = await request.json();
      if (response.error) {
        setLoading(false);
        setError(response.error);
        return;
      }
      if (response.id) {
        setLoading(false);
        
        document.cookie = `user_id=${response.id}; path=/; secure; samesite=None; max-age=43200`;

        router.push("/");
      }
    } catch {
      setError("  `حدث خطأ أثناء الاتصال بالسيرفر، حاول مرة أخرى لاحقًا`");
    }
  };
  return (
    <div className="bg-amber-50 flex flex-col items-center justify-center h-screen">
      <div className="font-bold text-black text-3xl">Welcome to Maktabty</div>
      <div className="text-2xl  mb-10 text-black">Login</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-64">
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="User Name:"
          className="h-12 p-1.5 bg-amber-50 rounded-lg text-black  "
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password: "
          className="h-12 p-1.5 bg-amber-50 rounded-lg text-black"
        />
        <button
          type="submit"
          className="cursor-pointer flex justify-center w-full h-8 items-center bg-blue-500 rounded-xl"
          disabled={loading}
        >
          {loading === true ? (
            <div className="duration-300 w-5 h-5 border-2  border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-black ">
          Don’t have an account?{" "}
          <Link className="text-sky-400" href={"/signup"}>
            Signup
          </Link>
        </div>
      </form>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
