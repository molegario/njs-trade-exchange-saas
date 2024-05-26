import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  postId: string
): Promise<number> => {
  try {
    const publishedSections = await db.section.findMany({
      where: {
        isPublished: true,
        postId,
      },
      select: {
        id: true,
      },
    });

    const publishedSectionIds = publishedSections.map((section) => section.id);

    const validCompletedSections = await db.userProgress.count({
      where: {
        userId: userId,
        sectionId: {
          in: publishedSectionIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      (validCompletedSections / publishedSections.length) * 100;

    return progressPercentage;
  } catch (e: any) {
    console.error(
      "[GET PROGRESS]",
      e?.message ?? "user progress not available."
    );
    return 0;
  }
};
