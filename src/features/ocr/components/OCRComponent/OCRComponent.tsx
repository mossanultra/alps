"use client";

import { useSession } from "next-auth/react";
import { useState, ChangeEvent, FormEvent } from "react";

interface ExerciseGroup {
  name: string;
  sets: { weight: string; reps: string }[];
}

interface OCRResult {
  date: string;
  exercises: ExerciseGroup[];
}

export default function OCRComponent() {
  const { data: session, status } = useSession();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    return <p>Not logged in</p>;
  }

  // ファイル選択時のハンドラー
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // フォーム送信時に API を呼び出す
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setOcrResult(null);

    // FormData に画像ファイルをセット
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }

      const data: OCRResult = await res.json();
      setOcrResult(data);

      //save to firestore
      const storeSaveRequestForm = new FormData();
      storeSaveRequestForm.append("trainingDay", data.date);
      storeSaveRequestForm.append("exercises", JSON.stringify(data.exercises));
      storeSaveRequestForm.append("image", selectedFile);
      storeSaveRequestForm.append("userId", session!.user!.id!);

      const storeSaveResponse = await fetch("/api/training", {
        method: "POST",
        body: storeSaveRequestForm,
      });
      if (!storeSaveResponse.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }
      await storeSaveResponse.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "OCR 処理中にエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>筋トレメモ 画像アップロードするとトレーニングメニューを抽出するよ</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!selectedFile || loading}>
          {loading ? "処理中..." : "OCR 実行"}
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {ocrResult && (
        <div style={{ marginTop: "1rem" }}>
          <h2>抽出されたエクササイズ情報</h2>
          <h3>日付: {ocrResult.date}</h3>
          {ocrResult.exercises.length === 0 ? (
            <p>エクササイズ情報は抽出されませんでした。</p>
          ) : (
            ocrResult.exercises.map((exercise, idx) => (
              <div key={idx} style={{ marginBottom: "1rem" }}>
                <h3>種目名: {exercise.name}</h3>
                {exercise.sets.map((set, setIdx) => (
                  <p key={setIdx}>
                    {set.weight} kg x {set.reps} reps
                  </p>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
