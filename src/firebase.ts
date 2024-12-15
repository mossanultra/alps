import { getAnalytics } from "firebase/analytics";
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getMessaging,
  getToken,
  MessagePayload,
  Messaging,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = typeof window !== "undefined" ? getAnalytics(app) : undefined;
let messaging: Messaging | undefined;

// Firebase 初期化とMessagingインスタンスの取得
if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

/**
 * トークンをリクエストする関数
 */
export const requestForToken = async (): Promise<void> => {
  if (!messaging) {
    console.warn("Messaging is not available in this environment.");
    return;
  }
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "dUv8aG0zwXZQoLaEhX_t3NjNOHE7jkg9zBUCCjZVNCI",
    });

    if (currentToken) {
      console.log("current token for client: ", currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.error("An error occurred while retrieving token.", err);
  }
};

/**
 * メッセージ受信リスナー
 */
export const onMessageListener = (): Promise<MessagePayload> => {
  return new Promise((resolve, reject) => {
    if (!messaging) {
      console.warn("Messaging is not available in this environment.");
      reject("Messaging not supported.");
      return;
    }
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
};
const auth = getAuth(app);

export { analytics, auth };
