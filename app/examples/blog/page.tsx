import { deleteBlog, getBlogs } from "@/actions/blog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Authorization } from "@/lib/authorization";
import { cn } from "@/lib/utils";
import { Eye, Pencil, Trash } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Blog() {
  const blogs = await getBlogs();
  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await deleteBlog(Number(id));
    revalidatePath("/examples/blog");

    redirect("/examples/blog");
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
        <Link href="/examples/blog/create" className={cn(buttonVariants({}))}>
          Create Blog
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        {blogs.length === 0 ? (
          <p className="text-gray-500">
            No blogs available. Please create a new one.
          </p>
        ) : (
          <ul className="flex flex-col gap-2 ">
            {blogs.map(async (blog) => (
              <li
                key={blog.id}
                className="p-4 border border-gray-200 rounded-md "
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {blog.content.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Link
                      href={`/examples/blog/${blog.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "icon" })
                      )}
                    >
                      <Eye className="h-4 w-4" />
                    </Link>

                    {(await Authorization.allows("can-edit-blog", blog.id)) && (
                      <>
                        <Link
                          href={`/examples/blog/${blog.id}/edit`}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "icon" })
                          )}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <form action={handleDelete} className="inline-block">
                          <input type="hidden" name="id" value={blog.id} />
                          <Button
                            type="submit"
                            variant="destructive"
                            size="icon"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </form>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
