import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, LayoutDashboard, PictureInPicture2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import SectionActions from "./_components/section-actions";
import { IconBadge } from "@/components/icon-badge";
import SectionTitleForm from "./_components/section-title-form";
import SectionDescriptionForm from "./_components/section-description-form";
import IsSubscriptionLockedForm from "./_components/issubscription-locked-form";
import SectionImageForm from "./_components/section-image-form";
import SectionVideoForm from "./_components/section-video-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SectionEditor = async (
  { params }: { params: { postId: string, sectionId: string } }
) => {

  const { userId } = auth();

  if(!userId) {
    return redirect("/");
  }

  const section = await db.section.findUnique({
    where: {
      id: params.sectionId,
      postId: params.postId,
    },
    include: {
      muxData: true,
    },
  });

  if(!section) {
    return redirect("/");
  }

  const requiredFields = [
    section.title,
    section.description,
    section.videoUrl || section.imageUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/dashboard/myposts/${params.postId}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to main post setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Section setup</h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <SectionActions
                disabled={!isComplete}
                postId={params.postId}
                sectionId={params.sectionId}
                isPublished={section.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-col-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h3 className="text-xl">Set details for this section</h3>
              </div>
              <SectionTitleForm
                initialData={section}
                postId={params.postId}
                sectionId={params.sectionId}
              />
              <SectionDescriptionForm
                initialData={section}
                postId={params.postId}
                sectionId={params.sectionId}
              />
              <IsSubscriptionLockedForm
                initialData={section}
                postId={params.postId}
                sectionId={params.sectionId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={PictureInPicture2} />
              <h3 className="text-xl">Section media</h3>
            </div>
            <Tabs defaultValue="video" className="w-full">
              <TabsList className="mb-0 mt-5">
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="image">Image</TabsTrigger>
              </TabsList>
              <TabsContent value="video" className="my-0">
                <SectionVideoForm
                  initialData={section}
                  postId={params.postId}
                  sectionId={params.sectionId}
                />
              </TabsContent>
              <TabsContent value="image">
                <SectionImageForm
                  initialData={section}
                  postId={params.postId}
                  sectionId={params.sectionId}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionEditor;