import { getPosts } from "@/actions/get-posts";
import PostsList from "@/components/post-list";
import { db } from "@/lib/db";
import Categories from "../../_components/categories";
import SearchInput from "../../_components/search-input";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AllPostsProps {
  searchParams: {
    title: string;
    categoryId: string;
  }
};

const AllPosts = async ({
  searchParams,
}: AllPostsProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const posts = await getPosts({
    userId: "",
    ...searchParams,
  });

  return (
    <section className="w-full h-full flex flex-col items-center">
      <div className="w-full flex flex-row justify-between p-4 fixed z-50">
        <Categories categories={categories} />
        {/* <SearchInput /> */}
      </div>
      <div className="w-[90%] max-w-[80rem] m-2 mb-[8rem] py-[14rem] md:py-[6rem]">
        <h1 className="text-center text-2xl m-8 font-semibold">
          All posts
        </h1>
        <PostsList posts={posts} />
      </div>
    </section>
  );
}
 
export default AllPosts;