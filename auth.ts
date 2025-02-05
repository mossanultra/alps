import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "@/firebase";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
      GitHub,
      Google,
      Credentials({
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("メールアドレスとパスワードを入力してください。");
          }
          try {
            const userCredential = await signInWithEmailAndPassword(
              firebaseAuth,
              credentials.email as string,
              credentials.password as string
            );
            const user = userCredential.user;
            console.log(user);
            return {
              id: user.uid,
              email: user.email,
              name: user.displayName,
            };
          } catch (error) {
            console.log(error);
            throw new Error("ログインに失敗しました。");
          }
        },
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.sub!;
        }
        return session;
      },
      async redirect({ url, baseUrl }) {
        console.log(url)
        return baseUrl + "/profile"; // 認証成功後 "/profile" にリダイレクト
      },
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
  });
  