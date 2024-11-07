import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Firebaseの初期化
const firebaseAdmin = getApps().length === 0 ? initializeApp({
  credential: cert({ // cert() の中に認証情報を渡す
    projectId: process.env.FSA_PROJECT_ID,
    privateKey: process.env.FSA_PRIVATE_KEY!.replace(/\\n/g, '\n'), // 改行文字の処理
    clientEmail: process.env.FSA_CLIENT_EMAIL,
  }),
}) : getApp();

// Firestoreインスタンスを取得
const db = getFirestore(firebaseAdmin);

export { db };
