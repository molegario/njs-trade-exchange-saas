"use client";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface PostActionProps {
  disabled: boolean;
  postId: string;
  isPublished: boolean;
}

const PostAction = ({
  disabled,
  postId,
  isPublished,
}: PostActionProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/posts/${postId}`);
      toast.success("Post deleted successfully");
      router.push(`/dashboard`);
      router.refresh();
    } catch (e: any) {
      toast.error(e.message ?? "Failed to delete course");
    } finally {
      setIsLoading(false);
    }
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/posts/${postId}/unpublish`);
        toast.success("Post unpublished successfully");
      } else {
        await axios.patch(`/api/posts/${postId}/publish`);
        toast.success("Post published successfully");
        confetti.onOpen();
      }

      router.refresh();
    } catch (e: any) {
      toast.error(e.message ?? "Failed to publish course");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onPublish}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default PostAction;
