import { NextResponse } from "next/server";

const API = process.env.JWT_SECRET;

export function middleware(request){
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/home", "/change-password", "/profile", "/user-onboarding"];
  const authRoutes = ["/login", "/forgot-password"];

  if(!token && protectedRoutes.includes(pathname)){
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if(token && authRoutes.includes(pathname)){
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [ "/home", "/login", "/change-password", "/forgot-password", "/profile", "/user-onboarding" ]
}