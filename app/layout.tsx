import "../styles/globals.css";
import supabaseServer from "../supabase/server";
import Navbar from "./components/Navbar";
import SupabaseListener from "./components/supabaseListener";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html>
      <SupabaseListener accessToken={session?.access_token} />
      <body>
        <Navbar isLogged={!!session?.user} />
        <main className="mx-auto max-w-3xl">{children}</main>
        <footer className=""></footer>
      </body>
    </html>
  );
}

export const revalidate = 0;
