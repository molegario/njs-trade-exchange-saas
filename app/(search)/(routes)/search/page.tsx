import { getPosts } from "@/actions/get-posts";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SearchInput from "../../../(main)/_components/search-input";
import Categories from "../../../(main)/_components/categories";
import PostsGrid from "../../../(main)/_components/posts-grid/posts-grid";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const posts = await getPosts({
    userId,
    ...searchParams,
  });

  return (
    <section className="w-full h-full flex flex-col items-center bg-slate-600">
      <div className="w-full flex flex-row justify-between p-4 fixed z-50">
        <Categories categories={categories} />
        <SearchInput />
      </div>
      <div className="w-[90%] max-w-[80rem] mx-2 mb-[8rem] py-[14rem] md:py-[6rem]">
        <h1 className="text-center text-2xl m-8 text-slate-400 font-semibold">
          All Posts
        </h1>
        <PostsGrid posts={posts} postpath="/search/posts" />
      </div>
    </section>
  );
};

export default SearchPage;
