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

    const sectionpatch = await db.section.update({
      where: {
        id: sectionId,
        postId: postId,
      },
      data: {
        isPublished: false,
      },
    });

    const publishedSectionsInPost = await db.section.findMany({
      where: {
        postId: params.postId,
        isPublished: true,
      },
    });

    if (!publishedSectionsInPost?.length) {
      await db.post.update({
        where: {
          id: params.postId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    return NextResponse.json(sectionpatch);
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/SECTIONS/[SECTIONID]/UNPUBLISH",
      e.message ||
        "POSTS/[POSTID]/SECTIONS/[SECTIONID]/UNPUBLISH API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
