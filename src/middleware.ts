import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { AuthSession } from "@/server/auth";

const publicRoutes = [
  "/",
  "/email-verified",
  "/reset-password",
  "/forgot-password",
];
const authRoutes = ["/sign-in", "/sign-up"];
const adminRoutes = ["/dashboard/admin"];
const publicApiRoutesPrefix = "/api/auth";
const REDIRECT_URL = "/dashboard";

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(pathName);
  const isAuthRoute = authRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.includes(pathName);
  const isPublicApiRoute = pathName.startsWith(publicApiRoutesPrefix);

  const { data: session } = await betterFetch<AuthSession>(
    "/api/auth/get-session",
    {
      baseURL: process.env.BETTER_AUTH_URL,
      headers: {
        //get the cookie from the request
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );

  // if you don't have a session
  if (!session) {
    // but is public route or auth route or public api route
    if (isPublicRoute || isAuthRoute || isPublicApiRoute) {
      // do nothing
      return NextResponse.next();
    }
    // else is a private route, redirect to sign in
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // if you have a session
  if (session) {
    // but it is an auth route
    if (isAuthRoute) {
      // redirect to dashboard
      return NextResponse.redirect(new URL(REDIRECT_URL, request.url));
    }
    // if it is an admin route,
    if (isAdminRoute) {
      // but the user is not an admin
      if (session.user.role !== "admin") {
        // redirect to home
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    // else do nothing
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
