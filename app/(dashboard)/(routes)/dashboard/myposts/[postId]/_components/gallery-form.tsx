"use client";

import { FileUpload } from "@/components/file-upload";
import { ContentCardSkeletonList } from "@/components/masonry/card-skeleton";
import { Masonry } from "@/components/masonry/masonry";
import { Button } from "@/components/ui/button";
import { GalleryImage, Post } from "@prisma/client";
import axios from "axios";
import { CircleX, PlusCircle, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

interface GalleryFormProps {
  initialData: Post & { galleryImages: GalleryImage[] };
  postId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

/**
 * Represents a form component for managing the gallery of a post.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.initialData - The initial data for the form.
 * @param {string} props.postId - The ID of the post.
 * @returns {JSX.Element} The rendered component.
 */
const GalleryForm = ({
  initialData,
  postId,
}: GalleryFormProps) => {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((edit) => !edit);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Submit the form
    try {
      await axios.post(`/api/posts/${postId}/galleryImages`, values);
      toast.success("Gallery was updated successfully.");
      toggleEdit();
      router.refresh(); // Refresh view 
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update gallery form");
    }
  };

  const onDelete = async (id: string) => {
    // Delete the image
    try {
      setDeleteId(id);
      await axios.delete(`/api/posts/${postId}/galleryImages/${id}`);
      toast.success("Image was deleted successfully.");
      router.refresh(); // Refresh view 
    } catch (e: any) {
      toast.error(e.message ?? "Failed to delete image");
    } finally {
      setDeleteId(null);
    }
  };

  // console.log("GALLERY", initialData.galleryImages);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Post gallery images
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.galleryImages.length === 0 && (
            <p className="text-sm mt-2 text-salte-500 italic">
              No gallery images
            </p>
          )}
          {initialData.galleryImages.length > 0 && (
            <div className="space-y-2 mt-2">
              <Masonry
                items={initialData.galleryImages}
                config={{
                  columns: [1, 2, 3, 3],
                  gap: [24, 12, 6, 6],
                  media: [640, 768, 1024, 1280],
                }}
                placeholder={<ContentCardSkeletonList itemcount={initialData?.galleryImages?.length ?? 0}/>}
                render={(item) => (
                  <div
                    className="relative aspect-video bg-slate-500 rounded-md"
                    key={item.id}
                  >
                    <Image
                      src={item.url}
                      alt={item.name}
                      className="rounded-md"
                      layout="responsive"
                      width={250}
                      height={250}
                    />
                    {
                      deleteId !== item.id && (
                        <button 
                          className="absolute right-0 top-0"
                          onClick={() => onDelete(item.id)}
                        >
                          <CircleX 
                            className="h-4 w-4 z-50 text-white m-1 mix-blend-color-dodge shadow-sm cursor-pointer"
                          />
                        </button>
                      )
                    }
                  </div>
                )}
              />
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="postImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add images to show people what is on offer.
          </div>
        </div>
      )}
    </div>
  );
}
 
export default GalleryForm;