"use client";
import { useActionState } from "react";

import { login } from "./actions/login";
import Link from "next/link";
export default function Login() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="bg-amber-50 flex flex-col items-center justify-center h-screen">
      <div className="font-bold text-black text-3xl">Welcome to Maktabty</div>
      <div className="text-2xl  mb-10 text-black">Login</div>
      <form action={formAction} className="flex flex-col gap-4 w-64">
        <input
          type="text"
          name="username"
          placeholder="User Name:"
          className="h-12 p-1.5 bg-amber-50 rounded-lg text-black  "
        />
        <input
          type="password"
          name="password"
          placeholder="Password: "
          className="h-12 p-1.5 bg-amber-50 rounded-lg text-black"
        />
        <button
          type="submit"
          className="cursor-pointer flex justify-center w-full h-8 items-center bg-blue-500 rounded-xl"
          disabled={isPending}
        >
          {isPending === true ? (
            <div className="duration-300 w-5 h-5 border-2  border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-black "><p>Don’t have an account?</p> <Link className="text-sky-400" href={'/signup'} >Signup</Link></div>
      </form>

      {state?.error && <p className="text-red-500">{state.error}</p>}
    </div>
  );
}
