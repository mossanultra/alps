"use client";
import OCRComponent from "@/features/ocr/components/OCRComponent/OCRComponent";
// import TrainingChart from "@/features/training/components/TrainingChart/TrainingChart";
import PixelArt from "@/features/pixel-art/compornent/pixel-art";

const PostPage = () => {
  return (
    <>
      <PixelArt></PixelArt>
      <OCRComponent></OCRComponent>
      {/* <h1>トレーニングデータのグラフ表示</h1>
      <TrainingChart
        userId="PeVnUTf4wMaeMwUXtkH2F8Alswg1"
        year="2025"
        month="02"
        exerciseName="レッグ プレス"
      /> */}
    </>
  );
};

export default PostPage;
