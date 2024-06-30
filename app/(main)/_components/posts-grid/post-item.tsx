import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface PostItemProps {
  post: Post;
  postpath?: string;
}

const PostItem = ({ post, postpath = "/posts" }: PostItemProps) => {
  return (
    <li className="shadow-md text-center rounded-md bg-slate-100 min-h-[360px] max-h-[360px] flex flex-col">
      <Link
        href={`${postpath}/${post.id}`}
        className="flex flex-col h-full w-full justify-between"
      >
        {!!post.imageUrl && (
          <div className="rounded-t-md min-h-[200px] max-h-[200px] overflow-hidden w-full h-auto relative">
            <h2 className="absolute mt-2 ml-2 rounded-t-md font-extrabold text-black text-xl">
              12 September 2024
            </h2>
            <h2 className="absolute mt-2 ml-2 rounded-t-md font-extrabold text-slate-100 mix-blend-hard-light text-xl">
              12 September 2024
            </h2>
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={300}
              height={200}
              className="object-cover rounded-t-md w-full"
            />
          </div>
        )}
        <div className="px-4 py-2 rounded-b-md flex flex-col justify-end overflow-hidden">
          <h3 className="text-2xl mb-2 font-semibold line-clamp-2 px-8">
            {post.title}
          </h3>
          <p className="line-clamp-3 text-justify px-2">{post.description}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
