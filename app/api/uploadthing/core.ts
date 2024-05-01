import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


const handleAuth = () => {
  const { userId } = auth();

  if (!userId) throw new Error("Unauthorized access");
  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug

  postImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  postAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  sectionVideo: f({
    video: {
      maxFileSize: "512GB",
      maxFileCount: 1,
    },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
