import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User  from "../../../models/user";
import connectToDB from "../../../database";

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
        // const currentUser = await serverAuth({
        //   credEmail: email || "",
        //   password: password || "",
        // });
        if (!email || !password) {
          throw new Error("Email and password required");
        }

        await connectToDB();
        try {
          const currentUser = await User.findOne({
            email,
          })
            .lean()
            .exec();
          if (currentUser) {
            throw new Error("Email does not exist");
          }
          const isCorrectPassword = await compare(
            password,
            currentUser.password || ""
          );

          if (!isCorrectPassword) {
            throw new Error("Incorrect password");
          }

          return currentUser
            ? { email: currentUser?.email, password: currentUser?.password }
            : { email: "", password: "" };
        } catch (e) {
          console.log(e);
          return { email: "", password: "" };
        }
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
