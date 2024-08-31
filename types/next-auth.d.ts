import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {} & DefaultSession["user"];
  }

  interface User extends DefaultSession["user"] {}
}
