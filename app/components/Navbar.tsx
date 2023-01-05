"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { signOut, supabase } from "../../supabase/client";

export default function Navbar({ isLogged }: any) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav aria-label="Main navigation" className="h-10">
      <ul className="flex h-full w-full flex-row items-center justify-end gap-4 text-md font-semibold text-[#212121]">
        <li className="mr-auto text-lg">
          <Link href="/" aria-label="Home">
            Quotespace
          </Link>
        </li>
        <li className={isLogged ? "block" : "hidden"}>
          <Link href="/likes">Likes</Link>
        </li>
        <li className={isLogged ? "block" : "hidden"}>
          <Link href="/profile">Profile</Link>
        </li>
        <li className={isLogged ? "block" : "hidden"}>
          <button onClick={handleLogout}>Logout</button>
        </li>
        <li className={!isLogged ? "block" : "hidden"}>
          <Link href="/signup">Sign Up</Link>
        </li>
        <li className={!isLogged ? "block" : "hidden"}>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
