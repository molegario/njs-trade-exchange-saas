"use client";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  // FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { BadgeDollarSign, EyeIcon, EyeOffIcon, Lock, LockIcon, Pencil, UnlockIcon } from "lucide-react";
import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Textarea } from "@/components/ui/textarea";
import { Post, Section } from "@prisma/client";
// import Editor from "@/components/editor";
// import Preview from "@/components/preview";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

interface IsSubscriptionLockedFormProps {
  initialData: Section;
  postId: string;
  sectionId: string;
}

const formSchema = z.object({
  isSubscriptionLocked: z.boolean().default(false),
});

const IsSubscriptionLockedForm = ({ initialData, postId, sectionId }: IsSubscriptionLockedFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((edit) => !edit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isSubscriptionLocked: !!initialData?.isSubscriptionLocked,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/posts/${postId}/sections/${sectionId}`, values);
      toast.success("Subscription Locked flag was updated successfully.");
      toggleEdit();
      router.refresh(); //refresh view
    } catch (e: any) {
      toast.error(e.message ?? "failed to update subscription locked form");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Subscription locked status
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Update subscription locked status
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.isSubscriptionLocked && "text-slate-500 italic"
          )}
        >
          {initialData?.isSubscriptionLocked ? (
            <p className="flex flex-row items-center">
              <LockIcon className="mr-2 inline" />This section is subscription locked.
            </p>
          ) : (
            <p className="flex flex-row items-center">
              <UnlockIcon className="mr-2 inline" />This section is accessible without subscription.
            </p>
          )}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="isSubscriptionLocked"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormDescription>
                      Check this box if want to lock this section to non-subscribers of this post.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default IsSubscriptionLockedForm;
// OLEGARIO PROGRESS TIMESTAMP REF: 2:52:42 https://youtu.be/Big_aFLmekI?t=10362
