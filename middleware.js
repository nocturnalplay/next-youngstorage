// <root>/middleware.ts
import { NextResponse } from "next/server";
import { Fetcher } from "./api/fetcher";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/") 
  {
    let he = req.headers.get("cookie");
    // This logic is only applied to /dashboard
    const fe = await Fetcher({
      path: `/checkuser?${he}`,
      method: "GET",
    });
    if (fe.status) {
      return NextResponse.redirect(`${process.env.URL}/dashboard`);
    } else {
      return NextResponse.next();
    }
  }
  else if (req.nextUrl.pathname.startsWith("/dashboard")) 
  {
    let he = req.headers.get("cookie");
    // This logic is only applied to /dashboard
    const fe = await Fetcher({
      path: `/checkuser?${he}`,
      method: "GET",
    });
    if (fe.status) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(`${process.env.URL}/auth/signin`);
    }
  }
}

// <root>/middleware.ts
// import { NextResponse } from "next/server";

// export async function middleware(req) {

// }
