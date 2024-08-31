import { auth } from "@/auth";
import { getBlogById } from "@/actions/blog";
import { User } from "next-auth";

export class Authorization {
  private static authorizations: Record<
    string,
    (user: User, ...args: any[]) => Promise<boolean>
  > = {
    "can-edit-blog": async (user, blogId: number) => {
      const blog = await getBlogById(blogId);

      if (blog && blog.authorId === user.id) return true;

      return false;
    },
  };

  static async allows(
    policyName: keyof typeof Authorization.authorizations,
    ...args: any[]
  ) {
    "use server";

    const session = await auth();

    if (session?.user) {
      return (
        this.authorizations[policyName] &&
        (await this.authorizations[policyName](session.user, ...args))
      );
    }

    return false;
  }

  static async allowsFor(
    policyName: keyof typeof Authorization.authorizations,
    user: User,
    ...args: any[]
  ) {
    "use server";

    return (
      this.authorizations[policyName] &&
      (await this.authorizations[policyName](user, ...args))
    );
  }
}
