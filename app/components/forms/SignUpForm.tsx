"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { signUp } from "../../../supabase/client";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = useCallback(async () => {
    if (username && password) {
      await signUp({ email: username, password: password });

      router.push("/");
    }
  }, [username, password, router]);

  return (
    <div className=" m-auto mt-12 max-w-2xl rounded-md border bg-zinc-50 p-10 shadow-md">
      <h2 className="mb-6 text-lg font-bold">Sign Up</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignUp();
        }}
        className="flex flex-col gap-6 text-md"
      >
        <label className="flex flex-col">
          Username
          <input
            className="rounded-md border px-4 py-2"
            type="text"
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="flex flex-col">
          Password
          <input
            className="rounded-md border px-4 py-2"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input
          className="max-w-min cursor-pointer rounded-lg border bg-lime-600 px-6 py-2 text-white"
          type="submit"
          name="submit"
          value="Login"
        />
      </form>
    </div>
  );
}
