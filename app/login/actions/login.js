"use server";
import { redirect } from "next/navigation";
export async function login(previous, formData) {
  const username = formData.get("username");
  const password = formData.get("password");

  if (username === "" || password == "") {
    return { error: "Please fill all  the inputs" };
  }
  if (password.length < 8) {
    return { error: "Password at least has 8 characters" };
  }
  const request = await fetch("https://library-m2k0.onrender.com/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      password: password,
    }),
 
  });

  const response = await request.json();
  console.log(response)
  if (response.error) {
    return response;
  } else {
    redirect("/");
  }
}
