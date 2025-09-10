// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import * as jose from "jose";

// const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "secret");

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   try {
//     await jose.jwtVerify(token, JWT_SECRET);
//     return NextResponse.next();
//   } catch (err) {
//     console.error("Invalid token", err);
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }
// export { default } from "next-auth/middleware";
// // Protect /dashboard route
// export const config = {
//   matcher: ["/dashboard/:path*"],
// };


// src/middleware.ts
// export { default } from "next-auth/middleware";

// export const config = {
//    matcher: ["/dashboard/:path*", "/leads/:path*", "/campaigns/:path*", "/settings/:path*"],
// };

// working


import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // redirect here if not logged in
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leads/:path*",
    "/campaigns/:path*",
    "/settings/:path*",
  ],
};
