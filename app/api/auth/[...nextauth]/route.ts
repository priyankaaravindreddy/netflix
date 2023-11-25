import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import fs from "fs";
const filePath = "data.json";

export const authOptions: AuthOptions = {
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
        console.log("credentials", credentials);

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        if (fs.existsSync(filePath)) {
          const fileData = fs.readFileSync(filePath, "utf-8");
          const jsonData = JSON.parse(fileData);
          console.log("jsonData", jsonData);
          console.log("credentials", credentials);

          // Filter the object based on email
          const existingUser = jsonData?.filter(
            ({ email: eleemail }: { email: string }) =>
              eleemail === credentials.email
          );
          console.log("existing user ", existingUser);
          let foundUser = null;
          if (existingUser?.length > 0) {
            foundUser = existingUser?.[0];
          }
          if (!foundUser.hashedPassword) {
            throw new Error("Email does not exist");
          }

          const isCorrectPassword = await compare(
            credentials.password,
           foundUser.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Incorrect password");
          } else {
            delete foundUser.hashedPassword;
            foundUser["role"] = "Unverified Email";
            return foundUser;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user?.role;
      return token;
    },
    async session({ session, token }) {
      // if (session?.user) session.user.role = token.role;
      // return session;

      return { ...session,
        user: { ...session.user,
          id: token.sub,
          isAdmin: token.isAdmin,
          role: token.role,
        }
      }
    },
  },
  secret: "NEXT_SECRET",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
