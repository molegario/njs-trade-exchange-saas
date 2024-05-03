interface SectionActionsProps {
  disabled: boolean;
  postId: string;
  sectionId: string;
  isPublished: boolean;
}

const SectionActions = ({
  disabled,
  postId,
  sectionId,
  isPublished,
}: SectionActionsProps) => {
  return ( 
    <div>
      Section Actions
    </div>
   );
}
 
export default SectionActions;