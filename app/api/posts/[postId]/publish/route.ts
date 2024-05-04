import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth();
    const { postId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const ownPost = await db.post.findUnique({
      where: {
        id: postId,
        userId: userId,
      },
      include: {
        sections: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!ownPost) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    if (
      ownPost?.sections.some(
        (xx) => !!(xx.muxData || xx.imageUrl) && !!xx.title && xx.description
      ) &&
      !!ownPost.title &&
      !!ownPost.description &&
      !!ownPost.imageUrl &&
      !!ownPost.categoryId
    ) {
      const postpatch = await db.post.update({
        where: {
          id: postId,
        },
        data: {
          isPublished: true,
        },
      });

      return NextResponse.json(postpatch);
    }
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/PUBLISH::PATCH ERROR",
      e.message || "POSTS/[POSTID]/PUBLISH API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
