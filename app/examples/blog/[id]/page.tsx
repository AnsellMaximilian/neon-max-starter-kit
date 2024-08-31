import { getBlogById } from "@/actions/blog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Comments from "../Comments";
import { Authorization } from "@/lib/authorization";

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
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-sm rounded-lg">
      <header className="justify-between flex">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{blog.title}</h1>
        <div className="flex space-x-4">
          {(await Authorization.allows("can-edit-blog", blog.id)) && (
            <Link
              href="/examples/blog"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Back to Blog List
            </Link>
          )}
        </div>
      </header>
      <p className="text-gray-700 mb-6 whitespace-pre-wrap">{blog.content}</p>

      <Comments blogId={blog.id} />
    </main>
  );
}
