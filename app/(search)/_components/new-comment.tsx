"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { RefreshCw } from "lucide-react";
// import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { FormEvent, MouseEvent, useMemo, useState } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

interface NewCommentProps {
  postId: string;
  memberName: string;
}

const getRandomName = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 2,
  });

const NewComment = ({ postId, memberName }: NewCommentProps) => {
  const [comment, setComment] = useState("");
  const [commenterName, setCommenterName] = useState(
    memberName.length === 0 ? getRandomName() : memberName
  );
  const router = useRouter();

  const onCommentSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    console.log("Comment submitted", comment);

    const reponse = await axios.post(`/api/posts/${postId}/comments`, {
      comment,
      commenterName,
    });

    setComment("");

    router.refresh();
  };

  const onRegenName = (evt: MouseEvent) => {
    evt.preventDefault();
    setCommenterName(getRandomName());
  };

  const noCommenterName = memberName.length === 0;

  return (
    <form
      className="my-0 mx-auto w-full rounded-sm bg-white shadow-sm p-2"
      onSubmit={onCommentSubmit}
    >
      <div className="flex flex-col gap-1">
        <div className="mb-[.5rem] flex-1 min-w-[10rem] flex flex-col">
          <h2 className="mb-1 flex items-center">
            Comment as{" "}
            <span
              className={cn(
                "mx-2",
                noCommenterName ? "text-[#EF5B2A]" : "text-slate-900",
                commenterName !== memberName && "text-red-600"
              )}
            >
              {commenterName}
            </span>{" "}
            <button type="button" onClick={onRegenName}>
              <RefreshCw className="h-4 w-4" />
            </button>
          </h2>
          <textarea
            id="comment"
            name="comment"
            rows={5}
            onChange={(evt) => setComment(evt.target.value)}
            className="text-sm p-2 border border-slate-400 rounded-sm"
            value={comment}
          />
        </div>
        <div className="flex flex-row justify-end">
          <Button type="submit" size="sm" variant="outline">
            Post comment
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NewComment;
