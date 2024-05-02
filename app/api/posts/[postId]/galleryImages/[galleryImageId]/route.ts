import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string; galleryImageId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const courseOwner = await db.post.findUnique({
      where: {
        id: params.postId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const attachment = await db.galleryImage.delete({
      where: {
        postId: params.postId,
        id: params.galleryImageId,
      },
    });
    return NextResponse.json(attachment);
  } catch (e: any) {
    console.error(
      "POST/[POSTID]/GALLERYIMAGES/[GALLERYIMAGEID]::DELETE::ERROR",
      e.message ||
        "POST/[POSTID]/GALLERYIMAGES/[GALLERYIMAGEID] API DB ACTION FAIL"
    );
    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
