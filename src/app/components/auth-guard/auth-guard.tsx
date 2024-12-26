// app/components/AuthGuard.tsx
"use client";

import { useAuthContext } from "@/app/context/AuthContext";
import React, { ReactNode } from "react";
import LoginPage from "../login/login";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { userId } = useAuthContext();

  // 未ログインの場合は LoginPage を表示
  if (!userId) {
    return <LoginPage />;
  }

  // ログイン済みの場合は子コンポーネントを表示
  return <>{children}</>;
};

export default AuthGuard;
