import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns, columnsRedux } from "./_components/columns";

const DashBoardPage = async () => {
  const { userId } = auth();

  if(!userId) {
    return redirect("/"); // Redirect to login page
  }

  const posts = await db.post.findMany({
    where: {
      userId: userId,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="p-6 hidden md:block">
        <DataTable columns={columns} data={posts} />
      </div>
      <div className="p-6 block md:hidden">
        <DataTable columns={columnsRedux} data={posts} />
      </div>
    </>
  );
}
 
export default DashBoardPage;