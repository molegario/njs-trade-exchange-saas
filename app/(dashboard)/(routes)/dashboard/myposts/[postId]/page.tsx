import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostAction from "./_components/post-action";
import { IconBadge } from "@/components/icon-badge";
import { ImageDownIcon, LayoutDashboard, ListChecks } from "lucide-react";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";
import SectionForm from "./_components/section-form";
import GalleryForm from "./_components/gallery-form";
import IsPurveyorForm from "./_components/ispurveyor-form";

const PostEditor = async ({ params }: { params: { postId: string } }) => {
  const {
    userId,
  } = auth();
  
  if(!userId) {
    return redirect("/"); //user not logged in
  }

  const  {
    postId,
  } = params

  if(!postId) {
    return redirect("/dashboard"); //post not found
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
      userId,
    },
    include: {
      sections: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
      galleryImages: {
        orderBy: {
          createdAt: "desc",
        },
      }
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if(!post) {
    return redirect("/dashboard"); //post unavailable
  }

  const requiredFields = [
    post.title,
    post.description,
    post.imageUrl,
    post.categoryId,
    post.sections.some(section=>section.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Post setup</h1>
            <span className="text-sm text-slate-700">
              Complete all fields {completionText}
            </span>
          </div>
          <PostAction
            disabled={!isComplete}
            postId={postId}
            isPublished={post.isPublished}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Post details</h2>
            </div>
            <IsPurveyorForm initialData={post} postId={post.id} />
            <TitleForm initialData={post} postId={post.id} />
            <DescriptionForm initialData={post} postId={post.id} />
            <CategoryForm
              initialData={post}
              postId={post.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
            <ImageForm initialData={post} postId={post.id} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Post sections</h2>
              </div>
              <SectionForm initialData={post} postId={post.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ImageDownIcon} />
                <h2 className="text-xl">Post gallery images</h2>
              </div>
              <GalleryForm initialData={post} postId={post.id} />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostEditor;
