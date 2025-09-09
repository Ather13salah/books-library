import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  // لو مفيش توكن ومش واقف في /signup أو /login → رجّعه signup
  if (!token && path !== "/signup" && path !== "/login") {
    return NextResponse.redirect(new URL('/signup', request.url));
  }

  // لو فيه توكن ومنع يدخل signup أو login
  if (
    token && (path.startsWith("/signup") || path.startsWith("/login"))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile/:path*', '/signup', '/login'],
};
