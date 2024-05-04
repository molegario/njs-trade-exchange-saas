import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string; sectionId: string } }
) {
  try {
    const { userId } = auth();
    const { postId, sectionId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const ownPost = await db.post.findUnique({
      where: {
        id: postId,
        userId: userId,
      },
    });

    if (!ownPost) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
        postId: postId,
      },
    });

    const muxData = await db.muxData.findUnique({
      where: {
        sectionId: sectionId,
      },
    });

    if (
      !section ||
      !section.title ||
      !section.description ||
      !((section.videoUrl && muxData) || section.imageUrl)
    ) {
      return new NextResponse("Missing required fields", { status: 404 });
    }

    const sectionpatch = await db.section.update({
      where: {
        id: sectionId,
        postId: postId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(sectionpatch);
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/SECTIONS/[SECTIONID]/PUBLISH::PATCH FAIL",
      e.message ||
        "POSTS/[POSTID]/SECTIONS/[SECTIONID]/PUBLISH API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
