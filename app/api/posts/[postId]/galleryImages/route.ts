import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth();
    const { url } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const postOwner = await db.post.findUnique({
      where: {
        id: params.postId,
        userId: userId,
      },
    });

    if (!postOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    // console.log("DB::", url, params.postId, url.split("/").pop());

    const attachment = await db.galleryImage.create({
      data: {
        url: url,
        name: url.split("/").pop(),
        postId: params.postId,
      },
    });

    return NextResponse.json(attachment);
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/GALLERYIMAGES::POST::ERROR::",
      e.message || "POSTS/[POSTID]/GALLERYIMAGES API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
