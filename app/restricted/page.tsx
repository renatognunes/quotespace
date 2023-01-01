import React from "react";
import supabaseServer from "../../supabase/server";

export default async function Page() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.from("all_quotes").select("*");
  const { data: res } = await supabase.auth.getSession();

  console.log(error);

  return <pre>{JSON.stringify({ error }, null, 2)}</pre>;
}
