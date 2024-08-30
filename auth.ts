import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";
import { cookies } from "next/headers";
import { Errors } from "./lib/errors";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ session, user, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const cookieStore = cookies();
        const errArray: string[] = [];

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            // No user found, so this is their first attempt to login
            // meaning this is also the place you could do registration
            throw new Error("User not found.");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Incorrect password");
          }

          // return usr object with their profile data
          return user;
        } catch (error) {
          if (error instanceof Error) {
            Errors.set("auth", error.message);
          }

          return null;
        } finally {
          Errors.flash();
        }
      },
    }),
  ],
});
