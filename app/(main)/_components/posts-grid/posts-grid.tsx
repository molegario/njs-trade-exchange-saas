import { Post } from "@prisma/client";
import PostItem from "./post-item";

interface PostsGridProps {
  posts: Post[];
  postpath?: string;
}

const PostsGrid = ({ posts = [], postpath = "/posts" }: PostsGridProps) => {
  return (
    <ul
      className="list-none gap-[1.5rem] content-center m-0 p-0 grid"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
      }}
    >
      {posts.map((post) => {
        return <PostItem key={post.id} post={post} postpath={postpath} />;
      })}
    </ul>
  );
};

export default PostsGrid;
