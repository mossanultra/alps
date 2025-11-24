import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

// Firebaseの初期化
const firebaseAdmin =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          // cert() の中に認証情報を渡す
          projectId: process.env.FSA_PROJECT_ID,
          privateKey: process.env.FSA_PRIVATE_KEY!.replace(/\\n/g, "\n"), // 改行文字の処理
          clientEmail: process.env.FSA_CLIENT_EMAIL,
        }),
      })
    : getApp();

// Firestoreインスタンスを取得
const db = getFirestore(firebaseAdmin);
const auth = getAuth();

export const verifyIdToken = async (
  token: string
): Promise<admin.auth.DecodedIdToken | null> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

export { db, auth };
