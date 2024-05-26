import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/goodbye", "/", "/api/uploadthing", "/posts", "/posts/:postId"],
});

//["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
