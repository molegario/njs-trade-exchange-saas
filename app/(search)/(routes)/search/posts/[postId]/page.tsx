import CommentsList from "@/app/(search)/_components/comments-list";
import NewComment from "@/app/(search)/_components/new-comment";
import Preview from "@/components/preview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const SearchPostDetails = async ({
  params,
}: {
  params: { postId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  // member name
  const member = await db.member.findUnique({
    where: {
      userId: userId,
    },
  });
  const memberName = member?.name || "";

  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      category: true,
      sections: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      comments: true,
    },
  });

  if (!post) {
    return redirect("/posts");
  }

  const humanReadableDate = new Date(post.createdAt).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const humanReadableDateSmall = new Date(post.createdAt).toLocaleDateString(
    "en-CA",
    {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }
  );
  // console.log("POSTS::", post);

  return (
    <>
      <div className="p-6 w-full lg:w-[80rem] h-full flex flex-col">
        <div className="flex items-end justify-between flex-none">
          <div className="flex flex-col gap-y-2 justify-start">
            <Link
              href="/search"
              className="flex items-center text-xl font-semibold hover:opacity-75 transition mb-2 text-slate-400"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to search
            </Link>
            <h1 className="text-3xl md:text-4xl font-medium text-white">
              {post?.title || `untitled: postID: ${params.postId}`}
            </h1>
            <span className="text-white font-medium">by TheCommonNonsense</span>
            <h2 className="text-sm md:hidden text-white font-semibold">
              {humanReadableDateSmall}
            </h2>
          </div>
          <div className="flex flex-col justify-start">
            <h2 className="text-sm hidden md:inline md:text-xl text-white font-semibold">
              {humanReadableDate}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mt-8 flex-1">
          <div className="space-y-6 border rounded-md border-slate-300 bg-stone-200 inset-3 p-4">
            <div>
              {post?.sections.map((section) => (
                <div key={section.id} className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    {section.title}
                  </h2>
                  {section.imageUrl && (
                    <Image
                      src={section.imageUrl}
                      alt={section.title}
                      className="rounded-md mb-4"
                      layout="responsive"
                      width={250}
                      height={250}
                    />
                  )}
                  <Preview value={section.description || ""} />
                </div>
              ))}
            </div>
          </div>
          <div className="border rounded-md border-slate-100 bg-stone-300 inset-3 p-4">
            <div className="text-xl">
              {post?.imageUrl && (
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  className="rounded-md mb-4"
                  layout="responsive"
                  width={250}
                  height={250}
                />
              )}
              <div className="flex justify-between">
                {post?.category?.name && (
                  <h2 className="text-2xl mb-4">
                    Category: {post?.category?.name}
                  </h2>
                )}
              </div>
              <Tabs defaultValue="tldr" className="w-full">
                <TabsList className="mb-0 mt-5">
                  <TabsTrigger value="tldr">TLDR</TabsTrigger>
                  <TabsTrigger value="comment">Comment</TabsTrigger>
                </TabsList>
                <TabsContent className="mb-0 py-4" value="tldr">
                  <p>{post?.description}</p>
                </TabsContent>
                <TabsContent
                  className="mb-0 py-4 flex flex-col gap-y-4"
                  value="comment"
                >
                  <NewComment postId={post.id} memberName={memberName} />
                  <CommentsList
                    comments={post.comments.reverse()}
                    userId={userId}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPostDetails;

type Props = {
  params: {
    postId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props) {
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  if (!post) {
    return {
      title: "Post Not Found",
      description: "Post Not Found",
    };
  }

  return {
    title: `Postarama: ${post.title}`,
    description: post.description || "No description",
  };
}
