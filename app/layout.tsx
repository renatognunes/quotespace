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
      <body className="flex flex-col gap-[8rem]">
        <header>
          <Container>
            <Navbar isLogged={!!session?.user} />
          </Container>
        </header>
        <main>
          <Container>{children}</Container>
        </main>
        <footer>
          <Container>{""}</Container>
        </footer>
      </body>
    </html>
  );
}

export const revalidate = 0;
