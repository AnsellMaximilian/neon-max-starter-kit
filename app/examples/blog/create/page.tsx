import { createBlog } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import { Auth } from "@/lib/auth";
import { Errors } from "@/lib/errors";
import { blogSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateBlogPage() {
  await Auth.authenticated();

  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    const validationResult = Errors.validateZod(blogSchema, { title, content });

    if (!validationResult.error) {
      await createBlog(title, content);
      revalidatePath("/examples/blog");

      redirect("/examples/blog");
    } else {
      redirect("/examples/blog/create");
    }
  }

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Create New Blog Post
        </h1>
      </div>
      <form action={handleCreate} className="space-y-6">
        <div className="form-group">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage message={Errors.get("title")} className="mt-4" />
        </div>
        <div className="form-group">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <ErrorMessage message={Errors.get("content")} className="mt-4" />
        </div>
        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </main>
  );
}
