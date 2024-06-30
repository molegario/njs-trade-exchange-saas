import { cn } from "@/lib/utils";
import { Comment } from "@prisma/client";

interface CommentsListProps {
  comments: Comment[];
  userId?: string;
}

const CommentsList = ({ comments = [], userId }: CommentsListProps) => {
  return (
    <>
      {comments.length > 0 ? (
        <div className="p-2">
          <h2 className="text-xl mb-4">Comments</h2>
          <ul className="flex flex-col gap-1 w-full">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className={cn(
                  "text-lg flex flex-col w-full mb-4",
                  userId === comment.userId
                    ? "text-[#EF5B2A]"
                    : "text-stone-800"
                )}
              >
                <p className="w-full">
                  {comment.text ? (
                    <>&ldquo;{comment.text}&rdquo;</>
                  ) : (
                    "-empty comment-"
                  )}
                </p>
                <div className="w-full flex text-xs ml-4">
                  by{" "}
                  <address className="ml-1">
                    {comment.name && comment?.name?.length > 0
                      ? comment.name
                      : "anon"}
                  </address>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="p-2">
          <h2 className="text-lg">No comments yet</h2>
        </div>
      )}
    </>
  );
};

export default CommentsList;
