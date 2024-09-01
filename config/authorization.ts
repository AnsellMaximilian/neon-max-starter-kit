import { getBlogById } from "@/actions/blog";
import { User } from "next-auth";

export const AUTHORIZATIONS: Record<
  string,
  (user: User, ...args: any[]) => Promise<boolean>
> = {
  "can-edit-blog": async (user, blogId: number) => {
    const blog = await getBlogById(blogId);

    if (blog && blog.authorId === user.id) return true;

    return false;
  },
};
