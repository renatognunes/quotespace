// Initialize the JS client
import { createClient } from "@supabase/supabase-js";
import { Database } from "./types";

// export const supabase = createClient<Database>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
// );

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { Database } from '../lib/database.types'

export const supabase = createBrowserSupabaseClient<Database>();

export async function getAllQuotes() {
  try {
    const { data, error } = await supabase
      .from("all_quotes")
      .select("id, quote, likes, shares, all_books(title)");

    if (!error) return data;

    return [];
  } catch (error) {
    console.log(error);
  }
}

export async function getAllBooks() {
  try {
    const { data, error } = await supabase
      .from("all_books")
      .select("id, title");

    if (!error) return data;

    return [];
  } catch (error) {
    console.log(error);
  }
}

export async function signIn({ email, password }: any) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (!error) return data;
  } catch (error) {
    console.log(error);
  }
}

export async function signUp({ email, password }: any) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!error) return data;
  } catch (error) {
    console.log(error);
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    console.log(error);
  } catch (error) {
    console.log(error);
  }
}

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (!error) return data;

    return [];
  } catch (error) {
    console.log(error);
  }
}
