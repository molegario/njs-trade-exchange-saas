import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const SearchPage = () => {


  const { userId } = auth();

  if(!userId) {
    return redirect("/sign-in");
  }





  return ( 
    <div>
      Search Page
    </div>
   );
}
 
export default SearchPage;