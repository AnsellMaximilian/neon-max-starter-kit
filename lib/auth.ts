import { auth } from "@/auth";
import { AUTH_URLS } from "@/config/auth";
import { redirect } from "next/navigation";

export class Auth {
  static async authenticated(redirectTo: string = AUTH_URLS.LOGIN) {
    "use server";
    const session = await auth();

    if (!session?.user) {
      return redirect(redirectTo);
    }

    return session.user;
  }

  static async guest(redirectTo: string = "/") {
    "use server";
    const session = await auth();

    if (session?.user) {
      return redirect(redirectTo);
    }
  }
}
