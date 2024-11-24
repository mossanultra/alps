import { useAuthContext } from "@/app/context/AuthContext";
import { useState } from "react";

export default function AuthView() {
  const [isSingUp, setIsSigneUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { SignIn, SignUp } = useAuthContext();

  const handleAuth = async () => {
    if (isSingUp) {
      SignUp(email, password);
    } else {
      SignIn(email, password);
    }
  };
  return (
    <div>
      <h1>{isSingUp ? "サインアップ" : "サインイン"}</h1>
      <div>
        <label>
          メールアドレス：
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          パスワード
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleAuth}>
        {isSingUp ? "サインアップ" : "サインイン"}
      </button>

      <button onClick={() => setIsSigneUp(!isSingUp)}>
        {isSingUp
          ? "アカウントを持ってる場合はサインインへ"
          : "アカウントがない場合はサインアップへ"}
      </button>
    </div>
  );
}
