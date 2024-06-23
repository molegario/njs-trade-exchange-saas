import { db } from "@/lib/db";
import { Category, Post } from "@prisma/client";

type PostWithProgressWithCategory = Post & {
  category: Category | null;
  sections: { id: string }[];
  // progress: number | null;
};

type GetPostsProps = {
  userId: string;
  categoryId?: string;
  title?: string;
};

export const getPosts = async ({
  userId="",
  categoryId="",
  title="",
}: GetPostsProps): Promise<PostWithProgressWithCategory[]> => {
  try {
    const posts = await db.post.findMany({
      where: {
        // isPublished: true,
        title: {
          contains: title,
        },
        categoryId: categoryId ? categoryId : undefined,
      },
      include: {
        category: true,
        sections: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const postsWithProgress: PostWithProgressWithCategory[] = await Promise.all(
      posts.map(async (post) => {

        return {
          ...post,
        };
      })
    );

    return postsWithProgress;
  } catch (e: any) {
    console.error("[GET POSTS]", e?.message ?? "posts not available.");
    return [];
  }
};
