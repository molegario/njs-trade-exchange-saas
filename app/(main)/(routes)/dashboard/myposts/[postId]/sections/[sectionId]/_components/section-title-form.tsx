"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Section } from "@prisma/client";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SectionTitleFormProps {
  initialData: Section;
  postId: string;
  sectionId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "A title of more than 1 character is required.",
  }),
});

const SectionTitleForm = ({
  initialData,
  postId,
  sectionId,
}: SectionTitleFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((edit) => !edit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}/sections/${sectionId}`, values);
      toast.success("Section title was updated successfully.");
      toggleEdit();
      router.refresh(); // Refresh view
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update section title");
    }
  };

  return ( 
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Section title
        <Button onClick={toggleEdit} variant="ghost">
          {
            isEditing ? (
              <>Cancel</>
            ) : (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit section title
              </>
            )
          }
        </Button>
      </div>
      {
        !isEditing ? (
          <p className="text-sm mt-2 mr-2">{initialData.title}</p>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField 
                control={form.control}
                name="title"
                render={
                  ({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          placeholder="e.g. `Section 1: Vehicle details`" 
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )
                }
              />
              <div className="flex items-center gap-x-2">
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        )
      }
    </div>
  );
}
 
export default SectionTitleForm;