import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const refresh_token = request.cookies.get('refresh_token')?.value;
  const path = request.nextUrl.pathname;

  if ((!token && !refresh_token) && path !== "/signup" && path !== "/login") {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  if (
    (token && refresh_token) && (path.startsWith("/signup") || path.startsWith("/login"))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/favourite/:path*', 
    '/books/:path*', 
    '/daily/:path*', 
    '/signup', 
    '/login'
  ],
};
