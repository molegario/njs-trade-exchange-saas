import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const { list } = await req.json();

    const postOwner = await db.post.findUnique({
      where: {
        id: params.postId,
        userId: userId,
      },
    });

    if (!postOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    for (let item of list) {
      await db.section.update({
        where: {
          id: item.id,
          postId: params.postId,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("Success reording sections", {
      status: 200,
      statusText: "OK",
    });
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/SECTIONS/REORDER::PUT::ERROR::",
      e.message || "POSTS/[POSTID]/SECTIONS/REORDER API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
