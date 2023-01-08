import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log(session.user);

  if (!session.user) {
    return NextResponse.redirect("/login");
  }

  return res;
}

export const config = {
  matcher: ["/profile", "/likes"],
};
