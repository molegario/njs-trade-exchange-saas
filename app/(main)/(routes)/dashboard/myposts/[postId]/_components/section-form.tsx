import { Post } from "@prisma/client";

interface SectionFormProps {
  initialData: Post;
  postId: string;
}

const SectionForm = ({
  initialData,
  postId,
}: SectionFormProps) => {
  return ( 
    <div>
      Post sections
    </div>
   );
}
 
export default SectionForm;