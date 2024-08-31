import { User } from "next-auth";
import { auth } from "@/auth";

export class Authorization {
  private static authorizations: Record<
    string,
    (user: User, ...args: any[]) => Promise<boolean>
  > = {};

  static async define(
    policyName: string,
    authorizationCallback: (user: User, ...args: any[]) => Promise<boolean>
  ) {
    "use server";

    this.authorizations[policyName] = authorizationCallback;
  }

  static async allows(policyName: string, ...args: any[]) {
    "use server";

    const session = await auth();

    if (session?.user) {
      return await this.authorizations[policyName](session.user, args);
    }

    return false;
  }

  static async allowsFor(policyName: string, user: User, ...args: any[]) {
    "use server";

    return (
      this.authorizations[policyName] &&
      this.authorizations[policyName](user, args)
    );
  }
}
