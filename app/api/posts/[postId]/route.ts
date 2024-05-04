import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const {
  video: Video,
} = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } },
) {
  try {
    const { userId } = auth();
    const { postId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    const post = await db.post.findUnique({
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
        attachments: true,
        galleryImages: true,
      },
    });

    if (!post) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }

    // flush section and related content
    if (post?.sections?.length > 0) {
      for (const section of post.sections) {
        if (section?.muxData?.assetId) {
          // delete mux asset
          await Video.assets.delete(section.muxData.assetId);
          // delete local record of mux data
          await db.muxData.delete({
            where: {
              id: section.muxData.id,
            },
          });
        }
        // delete section
        await db.section.delete({
          where: {
            id: section.id,
            postId: postId,
          },
        });
      }
    }

    // flush attachments
    if (post?.attachments?.length > 0) {
      for (const attachment of post.attachments) {
        await db.attachment.delete({
          where: {
            id: attachment.id,
            postId: postId,
          },
        });
      }
    }

    // flush gallery images
    if (post?.galleryImages?.length > 0) {
      for (const galleryImage of post.galleryImages) {
        await db.galleryImage.delete({
          where: {
            id: galleryImage.id,
            postId: postId,
          },
        });
      }
    }

    // delete post
    const deletedcourse = await db.post.delete({
      where: {
        id: postId,
        userId: userId,
      },
    });

    return NextResponse.json(deletedcourse);
  } catch(e:any) {
    console.error(
      "/POSTS/[POSTID]::DELETE::ERROR::",
      e.message ?? "/POSTS/[POSTID]::DELETE DB action Failure."
    );
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

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
      !values.categoryId &&
      (values.isPurveyor === undefined)  
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