"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Section, Post } from "@prisma/client";
import { Input } from "@/components/ui/input";
import SectionsList from "./sections-list";

interface SectionsFormProps {
  initialData: Post & { sections: Section[] };
  postId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "A title of more than 1 character is required.",
  }),
});

const SectionsForm = ({ initialData, postId }: SectionsFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/posts/${postId}/sections`, values);
      toast.success("Section created successfully.");
      toggleCreating();
      router.refresh(); //refresh view
    } catch (e: any) {
      toast.error(e.message ?? "failed to update description form");
    }
  };

  const onEdit = async (id: string) => {
    router.push(`/dashboard/myposts/${postId}/sections/${id}`);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/posts/${postId}/sections/reorder`, {
        list: updateData,
      });
      toast.success("Sections reordered successfully.");
      router.refresh(); //refresh view
    } catch (e: any) {
      toast.error(e.message ?? "failed to update section re-order");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className=" relative mt-6 border bg-slate-100 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Post sections
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a section
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. `Section 1: Vehicle details`"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            initialData?.sections?.length === 0 ? "text-slate-500 italic" : ""
          )}
        >
          {!initialData?.sections?.length && "No sections"}
          <SectionsList
            onEdit={onEdit}
            onReorder={onReorder}
            items={initialData?.sections ?? []}
          />
        </div>
      )}
      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder sections
        </p>
      )}
    </div>
  );
};

export default SectionsForm;
// OLEGARIO PROGRESS TIMESTAMP REF: 2:52:42 https://youtu.be/Big_aFLmekI?t=10362
