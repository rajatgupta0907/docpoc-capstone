import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook/clerk",
    "api/uploadthing",
    "/account",
    "/services",
    "/about-us",
    "/chat-test",
  ],
  ignoredRoutes: ["api/webhook/clerk", "api/uploadthing"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
