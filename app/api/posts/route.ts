import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST (
  req: Request,
) {
  try {

    const { userId } = auth();
    const { title } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    const post = await db.post.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(post);

  } catch (e:any) {
    console.error("/POSTS::POST::ERROR::", e.message ?? "POSTS::POST DB action Failure.");
    return new NextResponse(e.message ?? "Internal Error", { status: 500 });
  }

}