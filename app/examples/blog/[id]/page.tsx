import { getBlogById } from "@/actions/blog";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPageProps = {
  params: {
    id: string;
  };
};

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogById(Number(params.id));

  if (!blog) {
    return notFound();
  }

  return (
    <main className="blog-container">
      <h1 className="view-blog-title">{blog.title}</h1>
      <p className="view-blog-content">{blog.content}</p>
      <div className="blog-actions">
        <Link href={`/examples/blog/${blog.id}/edit`}>
          <button className="submit-button">Edit</button>
        </Link>
        <Link href="/examples/blog">
          <button className="submit-button">Back to Blog List</button>
        </Link>
      </div>
    </main>
  );
}
