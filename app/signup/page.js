"use client";
import { useActionState } from "react";
import Link from "next/link";
import { signup } from "./actions/signUp";
export default function Signup() {
  const [state, formAction, isPending] = useActionState(signup, undefined);

  return (
    <div className="bg-amber-50 flex flex-col items-center justify-center h-screen">
        <div className="text-2xl  mb-10 text-black">Register Now</div>
      <form action={formAction} className="flex flex-col gap-4 w-64">
        <input
          type="text"
          name="username"
          placeholder="User Name:"
          className="h-12 p-1.5 bg-amber-50 rounded-lg text-black  "
        />
        <input
          type="text"
          name="email"
          placeholder="Email:"
          className="h-12 p-1.5 bg-amber-50 rounded-lg text-black  "
        />
        <input
          type="password"
          name="password"
          placeholder="Password: "
          className="h-12 p-1.5 bg-amber-50 rounded-lg text-black"
        />
        <button type="submit" className="cursor-pointer flex justify-center w-full h-8 items-center bg-blue-500 rounded-xl" disabled={isPending}>
          {isPending === true ? (
            <div className="duration-300 w-5 h-5 border-2  border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Sign Up"
          )}
        </button>

        <div className="pl-1 text-black">
          Already have an account?<Link href="/login" className="text-blue-500">login</Link>
        </div>
      </form>

      {state?.error && <p className="text-red-500">{state.error}</p>}
      {state?.success && <p className="text-green-500">تم تسجيل الدخول ✅</p>}
    </div>
  );
}
