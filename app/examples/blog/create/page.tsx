import { createBlog } from "@/actions/blog";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreateBlogPage() {
  async function handleCreate(formData: FormData) {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    await createBlog(title, content);
    revalidatePath("/examples/blog");

    redirect("/examples/blog");
  }

  return (
    <main className="blog-container">
      <div className="form-header">
        <h1>Create New Blog Post</h1>
      </div>
      <form action={handleCreate} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={10}
            required
            className="textarea-field"
          />
        </div>
        <button type="submit" className="submit-button">
          Create
        </button>
      </form>
    </main>
  );
}
