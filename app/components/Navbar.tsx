"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { signOut, supabase } from "../../supabase/client";
import { NavLink } from "./shared/NavLink";

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
    <nav
      aria-label="Main navigation"
      className="h-12 border-b border-slate-800"
    >
      <ul className="flex h-full w-full flex-row items-center justify-end gap-6 text-md text-white">
        <li className="mr-auto text-lg font-semibold">
          <NavLink href="/" aria-label="Home">
            Quotespace
          </NavLink>
        </li>
        <li className={isLogged ? "block" : "hidden"}>
          <NavLink href="/bookmarks">Booksmarks</NavLink>
        </li>
        <li className={isLogged ? "block" : "hidden"}>
          <NavLink href="/profile">Profile</NavLink>
        </li>
        <li className={isLogged ? "block" : "hidden"}>
          <button onClick={handleLogout}>Logout</button>
        </li>
        <li className={!isLogged ? "block" : "hidden"}>
          <NavLink href="/signup">Sign up</NavLink>
        </li>
        <li className={!isLogged ? "block" : "hidden"}>
          <NavLink href="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}
