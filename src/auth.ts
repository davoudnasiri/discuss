import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

const GITHUb_ClIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUb_ClIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUb_ClIENT_ID || !GITHUb_ClIENT_SECRET) {
  throw new Error("Missing github oauth credentials");
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: GITHUb_ClIENT_ID,
      clientSecret: GITHUb_ClIENT_SECRET,
    }),
  ],
  callbacks: {
    // Usually not needed, here we are fixing a bug in nextauth
    async session({ session, user }: any) {
      if (session && user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
});
