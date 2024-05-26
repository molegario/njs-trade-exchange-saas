import { Category, Post } from "@prisma/client";
import PostCard from "./post-card";

export type PostWithProgressWithCategory = Post & {
  category: Category | null;
  sections: { id: string }[];
  progress: number | null;
};

interface PostsListProps {
  posts: PostWithProgressWithCategory[];
};

const PostsList = ({
  posts,
}: PostsListProps) => {
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {
          posts.map(
            post => (
              <PostCard 
                key={post.id}
                id={post.id}
                title={post.title}
                imageUrl={post.imageUrl!}
                sectionsLength={post.sections.length}
                progress={post.progress}
                category={post.category?.name || "Uncategorized"}
              />
            )
          )
        }
      </div>
      {
        posts.length === 0 && (
          <div className="flex items-center justify-center h-96">
            <p className="text-lg text-slate-500">No posts found</p>
          </div>
        )
      }
    </>
  );
}
 
export default PostsList;