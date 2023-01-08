"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { signIn } from "../../../supabase/client";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    if (username && password) {
      await signIn({ email: username, password: password });

      router.push("/");
    }
  }, [username, password, router]);

  return (
    <div className="rounded-2xl border border-slate-800 py-10 px-14 shadow-inner shadow-slate-800">
      <h2 className="mb-6 text-lg font-bold text-white">Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="flex flex-col gap-6 text-md"
      >
        <label className="flex flex-col font-light text-white">
          Username
          <input
            className="mt-2 rounded-md border border-slate-700 bg-slate-800 px-4 py-2 shadow-sm"
            type="text"
            name="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="flex flex-col font-light text-white">
          Password
          <input
            className="mt-2 rounded-md border border-slate-700 bg-slate-800 px-4 py-2 shadow-sm"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input
          className="button-primary flex max-w-min cursor-pointer items-center justify-center gap-2 self-end justify-self-end rounded-full border border-slate-800 px-6 py-2 text-md text-white"
          type="submit"
          name="submit"
          value="Login"
        />
      </form>
    </div>
  );
}
