import { deleteBlog, getBlogs } from "@/actions/blog";
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
    <main className="blog-container">
      <div className="blog-header">
        <h1>Blogs</h1>
        <Link href="/examples/blog/create">
          <button className="create-button">Create Blog</button>
        </Link>
      </div>

      <div className="blog-list">
        {blogs.length === 0 ? (
          <p>No blogs available. Please create a new one.</p>
        ) : (
          <ul>
            {blogs.map((blog) => (
              <li key={blog.id} className="blog-item">
                <h2>{blog.title}</h2>
                <p>{blog.content.substring(0, 100)}...</p>
                <div className="blog-actions">
                  <Link
                    href={`/examples/blog/${blog.id}`}
                    className="link-button"
                  >
                    View
                  </Link>
                  <Link
                    href={`/examples/blog/${blog.id}/edit`}
                    className="link-button"
                  >
                    Edit
                  </Link>
                  <form action={handleDelete}>
                    <input type="hidden" name="id" value={blog.id} />
                    <button type="submit">Delete</button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
