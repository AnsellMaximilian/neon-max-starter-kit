import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const sql = neon(process.env.DATABASE_URL!);

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
        let user = null;

        const result =
          await sql`SELECT * FROM users WHERE email = ${credentials.email}`;

        user = result[0];

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        if (
          user &&
          bcrypt.compareSync(credentials.password as string, user.password)
        ) {
          throw new Error("Incorrect credentials");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
