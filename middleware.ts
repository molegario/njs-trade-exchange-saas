import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/goodbye"],
});

//["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

//---
// OLEGARIO - changed to use new Clerks API which uses new clerkMiddleware method
// note: you can no longer define "unprotected" routes and must list all protected routes
// TIMESTAMP:: 2021-09-29T14:00:00Z https://youtu.be/ZbX4Ok9YX94?t=2914
//---
