"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const authenticated = async () => {
  const session = await auth();

  if (!session?.user) {
    return redirect("/auth/login");
  }

  return session.user;
};

export const unAuthenticated = async () => {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }
};
