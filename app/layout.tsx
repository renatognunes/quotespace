import "../styles/globals.css";
import supabaseServer from "../supabase/server";
import Navbar from "./components/Navbar";
import Container from "./components/shared/Container";
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
      <body className="mx-auto flex flex-col gap-[8rem] bg-black">
        <header>
          <Container>
            <Navbar isLogged={!!session?.user} />
          </Container>
        </header>
        <main className="mx-auto w-full max-w-[70rem]">{children}</main>
        <footer>
          <Container>{""}</Container>
        </footer>
      </body>
    </html>
  );
}

export const revalidate = 0;
