import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

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
      },
    }),
  ],
});
