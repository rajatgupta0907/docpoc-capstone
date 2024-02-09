import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
    publicRoutes: ["/", "/api/webhook/clerk", "api/uploadthing","/account","/services","/about-us"],
    ignoredRoutes: ["api/webhook/clerk", "api/uploadthing"],
  });
  
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};