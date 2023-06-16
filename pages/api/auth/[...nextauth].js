import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./lib/connectDB";
import Users from "../../models/doctorUserModel";
import bcrypt from "bcrypt";
connectDB();
export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await Users.findOne({ email });
        if (!user) {
          throw new Error("You haven't registered yet");
        }
        if (user) {
          return signInUser({ password, user });
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: "secret",
  database: process.env.MONGODB_URI,
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      session.user.email = token.user.email;
      session.user.role = token.user.role;
      return session;
    },
  },
};

export default NextAuth(authOptions);
const signInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter password");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password not correct");
  }
  return user;
};
