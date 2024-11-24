// app/context/AuthContext.tsx
"use client";
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

type AuthContextType = {
  userId: string | null;
  SignIn: (email: string, password: string) => void;
  SignUp: (email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const SignIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing in:", error.code, error.message);
      });
  };

  const SignUp = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed up:", userCredential.user);
      })
      .catch((error) => {
        console.error("Error signing up:", error.code, error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, SignIn, SignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
