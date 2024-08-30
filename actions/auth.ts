"use server";
import { signIn } from "@/auth";
import { Errors } from "@/lib/errors";
import { registerSchema, signInSchema } from "@/lib/zod";
import { neon } from "@neondatabase/serverless";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const sql = neon(process.env.DATABASE_URL!);
const prisma = new PrismaClient();

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = Errors.validateZod(registerSchema, {
    name,
    username,
    email,
    password,
  });

  if (error) {
    return redirect("/auth/register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });

  redirect("/auth/login");
}

// Server action to handle login
export async function loginUser(formData: FormData) {
  let hasError = false;
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = Errors.validateZod(signInSchema, { email, password });

    if (error) {
      redirect("/auth/login");
    }

    await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
  } catch (error) {
    hasError = true;
  } finally {
    // redirects need to be called inside a finally block; otherwise it will throw a NEXT_REDIRECT error
    if (hasError) redirect("/auth/login");
    else redirect("/");
  }
}
