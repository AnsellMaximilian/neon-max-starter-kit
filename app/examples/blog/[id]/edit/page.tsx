import { getBlogById, updateBlog } from "@/actions/blog";
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
    <main className="blog-container">
      <div className="form-header">
        <h1>Edit Blog Post</h1>
      </div>
      <form action={handleUpdate} className="blog-form">
        <div className="form-group">
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={blog.title}
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="label">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            defaultValue={blog.content}
            required
            className="textarea-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
    </main>
  );
}
