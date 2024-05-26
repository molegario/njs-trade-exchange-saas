import { db } from "@/lib/db";
import { Category, Post } from "@prisma/client";
import { getProgress } from "./get-progress";

type PostWithProgressWithCategory = Post & {
  category: Category | null;
  sections: { id: string }[];
  progress: number | null;
};

type GetPostsProps = {
  userId: string;
  categoryId?: string;
  title?: string;
};

export const getPosts = async ({
  userId,
  categoryId,
  title,
}: GetPostsProps): Promise<PostWithProgressWithCategory[]> => {
  try {
    const posts = await db.post.findMany({
      where: {
        // isPublished: true,
        title: {
          contains: title,
        },
        categoryId: categoryId,
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
        subscriptions: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const postsWithProgress: PostWithProgressWithCategory[] = await Promise.all(
      posts.map(async (post) => {
        if (post.subscriptions.length === 0) {
          return {
            ...post,
            progress: null,
          };
        }

        const progressPercentage = await getProgress(userId, post.id);

        return {
          ...post,
          progress: progressPercentage,
        };
      })
    );

    return postsWithProgress;
  } catch (e: any) {
    console.error("[GET POSTS]", e?.message ?? "posts not available.");
    return [];
  }
};
