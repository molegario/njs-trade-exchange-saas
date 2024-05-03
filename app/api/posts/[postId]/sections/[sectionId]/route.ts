import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video: Video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string; sectionId: string } }
) {
  try {
    const { userId } = auth();

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

    const section = await db.section.findUnique({
      where: {
        id: params.sectionId,
        postId: params.postId,
      },
    });

    if (!section) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (section.videoUrl) {
      const muxData = await db.muxData.findFirst({
        where: {
          sectionId: params.sectionId,
        },
      });

      if (muxData) {
        await Video.assets.delete(muxData.assetId);
        await db.muxData.delete({
          where: {
            id: muxData.id,
          },
        });
      }
    }

    const deletedSection = await db.section.delete({
      where: {
        id: params.sectionId,
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

    return NextResponse.json(deletedSection);
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/SECTIONS/[SECTIONID]::DELETE",
      e.message ||
        "POSTS/[POSTID]/SECTIONS/[SECTIONID]::DELETE API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string; sectionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const { isPublished, ...values } = await req.json();

    const postOwner = await db.post.findUnique({
      where: {
        id: params.postId,
        userId: userId,
      },
    });

    if (!postOwner) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const section = await db.section.update({
      where: {
        id: params.sectionId,
        postId: params.postId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          sectionId: params.sectionId,
        },
      });

      if (existingMuxData) {
        await Video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      const asset = await Video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
        test: false,
      });

      await db.muxData.create({
        data: {
          sectionId: params.sectionId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id ?? "",
        },
      });
    }

    return NextResponse.json(section);
  } catch (e: any) {
    console.error(
      "POSTS/[POSTID]/SECTIONS/[SECTIONID]::PATCH ERROR",
      e.message || "POSTS/[POSTID]/SECTIONS/[SECTIONID]::PATCH API DB ACTION FAIL"
    );

    return new NextResponse(e.message ?? "Internal server error", {
      status: 500,
    });
  }
}
