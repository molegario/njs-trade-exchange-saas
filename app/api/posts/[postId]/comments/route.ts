import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { userId } = auth();

    const reqObj = await req.json();
    const { comment, commenterName } = reqObj;

    console.log(
      "AUTH::",
      userId,
      "::",
      comment,
      "::",
      commenterName,
      "::",
      reqObj
    );

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    await db.member.upsert({
      where: {
        userId: userId,
      },
      update: {
        name: commenterName,
      },
      create: {
        userId: userId,
        name: commenterName,
      },
    });

    const datacomment = await db.comment.create({
      data: {
        postId: params.postId,
        userId: userId,
        text: comment,
        name: commenterName,
      },
    });

    return NextResponse.json(datacomment);
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/COMMENTS::POST::ERROR::",
      e.message || "POSTS/[POSTID]/COMMENTS API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
