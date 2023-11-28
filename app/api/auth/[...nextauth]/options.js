import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import serverAuth from "../../../lib/serverAuth";
import {User} from "../../../models/user"

export const authOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};
        // const response = await fetch("/api/credentials");
        // const credentialsData = await response.json();

        // console.log("credentials", credentials);
        const currentUser = await serverAuth({
          credEmail: email || "",
          password: password || "",
        });
        console.log("currentUser ", currentUser);
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        // Find the user based on email
        // const foundUser = credentialsData.find(
        //   ({ email }: { email: string }) => email === credentials.email
        // );

        if (JSON.stringify(currentUser) === JSON.stringify({})) {
          throw new Error("Email does not exist");
        }

        const isCorrectPassword = await compare(
          credentials.password,
          currentUser.password||''
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }


        return currentUser;
      },
    }),
  ],
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   if (url.startsWith("/")) return `${baseUrl}${url}`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      // if (session?.user) session.user.role = token.role;
      // return session;
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isAdmin: token.isAdmin,
        },
      };
    },
  },
};
