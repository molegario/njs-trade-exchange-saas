import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth();
    const { title }: { title: string } = await req.json();

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

    const lastSection = await db.section.findFirst({
      where: {
        postId: params.postId,
      },
      orderBy: {
        id: "desc",
      },
    });

    const newPosition = lastSection?.position ? lastSection.position + 1 : 1;

    const section = await db.section.create({
      data: {
        title,
        postId: params.postId,
        position: newPosition,
      },
    });

    return NextResponse.json(section);
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/SECTIONS::POST::ERROR::",
      e.message || "POSTS/[POSTID]/SECTIONS API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
