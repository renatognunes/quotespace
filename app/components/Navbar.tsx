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
    <header>
      <nav aria-label="Main navigation" className="h-14 px-8">
        <ul className="flex h-full flex-row items-center justify-between font-semibold text-[#212121]">
          <li className="justify-items-start">
            <Link href="/" aria-label="Home">
              Quotepedia
            </Link>
          </li>
          {isLogged ? (
            <div className="flex gap-6">
              <li>
                <Link href="/likes">Likes</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </div>
          ) : (
            <div className="flex gap-6">
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

// export default Navbar;
