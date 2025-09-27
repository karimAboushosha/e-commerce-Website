// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {

// const token = 

//     request.cookies.get("next-auth.session-token")?.value ||
//     request.cookies.get("__Secure-next-auth.session-token")?.value;

//     if(!token){
//         return NextResponse.redirect(new URL('/login', request.url))
//     }

//   return NextResponse.next()
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/products","/checkout", "/favorites"],
// }



// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // getToken handles both dev & prod cookies (__Secure- and non-Secure)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // only protect pages that require login
  matcher: ["/cart", "/checkout"],
};
