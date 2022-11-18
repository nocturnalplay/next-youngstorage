// <root>/middleware.ts
import { NextResponse } from "next/server";
import { Fetcher } from "./api/fetcher";

export async function middleware(req) {
  try {
    let he = req.headers.get("cookie");
    if (!he) {
      return NextResponse.redirect(`${process.env.URL}`)
    }
    let co = he.split(";");
    co = co.map((a) => a.split("="));
    co = co.filter((a) => a[0] === "token");
    let token = co[0][1];

    if (req.nextUrl.pathname === "/") {
      // This logic is only applied to /dashboard
      const fe = await Fetcher({
        path: `/checkuser?token=${token}`,
        method: "GET",
      });
      if (fe.status) {
        return NextResponse.redirect(`${process.env.URL}/dashboard`);
      } else {
        return NextResponse.next();
      }
    } else if (req.nextUrl.pathname.startsWith("/dashboard")) {
      // This logic is only applied to /dashboard
      const fe = await Fetcher({
        path: `/checkuser?token=${token}`,
        method: "GET",
      });
      if (fe.status) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(`${process.env.URL}/auth/signin`);
      }
    } else if (
      req.nextUrl.pathname === "/auth/signin" ||
      req.nextUrl.pathname === "/auth/otpverify"
    ) {
      // This logic is only applied to /dashboard
      const fe = await Fetcher({
        path: `/checkuser?token=${token}`,
        method: "GET",
      });
      if (fe.status) {
        return NextResponse.redirect(`${process.env.URL}/dashboard`);
      } else {
        return NextResponse.next();
      }
    }
  } catch (error) {
    console.log(error.message);
    
  }
}

// <root>/middleware.ts
// import { NextResponse } from "next/server";

// export async function middleware(req) {

// }
