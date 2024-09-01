import { auth } from "@/auth";
import { User } from "next-auth";
import { AUTHORIZATIONS } from "@/config/authorization";

export class Authorization {
  private static authorizations = AUTHORIZATIONS;

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
