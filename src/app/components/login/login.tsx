// app/page.tsx
"use client";
import { useAuthContext } from "@/app/context/AuthContext";
import { useState } from "react";
import styles from "./login.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignIn, SignUp } = useAuthContext();
  const handleSignIn = () => {
    SignIn(email, password);
  };

  const handleSignUp = () => {
    SignUp(email, password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pandaIcon}></div>
      <h1 className={styles.title}>Welcome</h1>
      <div className={styles.form}>
        <input
          type="email"
          placeholder="メールアドレス"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} onClick={handleSignIn}>
          ログイン
        </button>
        <button className={styles.button} onClick={handleSignUp}>
          新規登録
        </button>
      </div>
      <p className={styles.footer}>© 2024 Maho&Mozuku</p>
    </div>
  );
}
