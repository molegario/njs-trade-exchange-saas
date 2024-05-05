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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "A title is required.",
  })
});

const CreatePost = () => {
  const router = useRouter();

  // configure form validation from schema
  const form = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { 
    isSubmitting,
    isValid,
   } = form.formState;

   const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/posts", values);
      router.push(`/dashboard/myposts/${response.data.id}`);
    } catch (e:any) {
      toast.error(e.message ?? "An error occurred.");
    }
   };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Title your post.</h1>
        <p>
          Choose a post title that will attract the help you want. Don&apos;t worry, you can always change it later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={
                ({ field }) => <FormItem>
                  <FormLabel>
                    Post Title
                  </FormLabel>
                  <FormControl>
                    <Input 
                      disabled={isSubmitting}
                      placeholder="e.g. I need a guy with a truck to help me move a couch."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be brief but descriptive about what you are looking for.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              }
            />
            <div className="flex items-center gap-x-2">
              <Link href="/dashboard">
                <Button
                  type="button"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
 
export default CreatePost;