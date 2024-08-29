import { getBlogById, updateBlog } from "@/actions/blog";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

type EditBlogPageProps = {
  params: {
    id: string;
  };
};

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const blog = await getBlogById(Number(params.id));

  if (!blog) {
    return notFound();
  }

  const foundBlog = blog;

  async function handleUpdate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await updateBlog(foundBlog.id, title, content);
    revalidatePath("/examples/blog");

    redirect(`/examples/blog/${foundBlog.id}`);
  }

  return (
    <main className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog Post</h1>
      </div>
      <form action={handleUpdate} className="space-y-6">
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
            defaultValue={blog.title}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            defaultValue={blog.content}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit" className="w-full">
          Update
        </Button>
      </form>
    </main>
  );
}
