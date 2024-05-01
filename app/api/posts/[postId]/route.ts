import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const { userId } = auth();
    const { postId } = params;
    const values = await req.json();

    if(!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(
      !values.title &&
      !values.description &&
      !values.imageUrl &&
      !values.categoryId
    ) {
      return new NextResponse("No values to update", { status: 400 });
    }

    const postPatch = await db.post.update({
      where: {
        id: postId,
        userId: userId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(postPatch);
  } catch(e:any) {
    console.error(
      "/POSTS/[POSTID]::PATCH::ERROR::",
      e.message ?? "/POSTS/[POSTID]::PATCH DB action Failure."
    );
  }
}