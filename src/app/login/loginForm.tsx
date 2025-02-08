"use client"; // クライアントコンポーネントとしてマーク

import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "./loginForm.module.css";
import DanielLogo from "@/components/layout/logo/logo";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/firebase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  // ログイン処理
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // const result = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });
    try {
      const credentials = {
        email: email, password: password
      };
      await signIn("credentials", credentials)

      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // const idToken = await userCredential.user.getIdToken();
      // console.log(idToken)
      // await signInByNextAuth("credentials", {
      //   idToken,
      //   callbackUrl: "/profile",
      // });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className={styles.container}>
        <DanielLogo/>
        <div className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className={styles.button} type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ backgroundColor: "#8c6239" }}
          >
            {isLogin ? "Create an account" : "Already have an account? Login"}
          </button>
          <p className={styles.footer}>© 2024 Maho with Shinya</p>
        </div>
      </div>
    </form>
  );
}
