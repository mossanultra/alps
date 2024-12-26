import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
// import './ThreeDCard.css'; // 必要であれば外部CSSファイルに分けてください

type ThreeDCardProps = {
  colorTheme?: "purple" | "green" | "yellow" | "blue" | "pink"; // blueとpinkを追加
  title: string;
  createdAt: string;
  content: string;
  url: string;
  month: string;
  day: string;
};

const ThreeDCard: React.FC<ThreeDCardProps> = ({
  colorTheme = "yellow",
  title,
  content,
  month,
  day,
  url,
}) => {
  const themeClass =
    colorTheme === "purple"
      ? "theme-purple"
      : colorTheme === "green"
      ? "theme-green"
      : colorTheme === "blue"
      ? "theme-blue"
      : colorTheme === "pink"
      ? "theme-pink"
      : "theme-yellow"; // デフォルトは黄色
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
  };
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      // 画面上部に描画されたタイミングでtransformを適用
      card.style.transform = "rotate3d(0.5, 1, 0, 30deg)";
    }
  }, []);

  return (
    <div className={`parent ${themeClass}`}>
      <div className="card">
        <div className="content-box">
          <span className="card-title">{title}</span>
          <p className="card-content">{content}</p>
          <span className="see-more" onClick={() => handleClick(url)}>
            See More
          </span>
        </div>
        <div className="date-box">
          <span className="month">{month}</span>
          <span className="date">{day}</span>
        </div>
      </div>
      <style jsx>{`
        .parent {
          width: 80%;
          padding: 20px;
          perspective: 1000px;
        }

        .card {
          padding-top: 50px;
          border: 3px solid rgb(255, 255, 255);
          transform-style: preserve-3d;
          background: linear-gradient(
              135deg,
              #0000 18.75%,
              #f3f3f3 0 31.25%,
              #0000 0
            ),
            repeating-linear-gradient(
              45deg,
              #f3f3f3 -6.25% 6.25%,
              #ffffff 0 18.75%
            );
          background-size: 60px 60px;
          background-position: 0 0, 0 0;
          background-color: #f0f0f0;
          width: 100%;
          box-shadow: rgba(142, 142, 142, 0.3) 0px 30px 30px -10px;
          transition: all 0.5s ease-in-out;
        }

        .card:hover {
          background-position: -100px 100px, -100px 100px;
          transform: rotate3d(0.5, 1, 0, 30deg);
        }

        .content-box {
          transition: all 0.5s ease-in-out;
          padding: 60px 25px 25px 25px;
          transform-style: preserve-3d;
        }

        .content-box .card-title {
          display: inline-block;
          color: white;
          font-size: 12px;
          font-weight: 900;
          transition: all 0.5s ease-in-out;
          transform: translate3d(0px, 0px, 50px);
        }

        .content-box .card-title:hover {
          transform: translate3d(0px, 0px, 60px);
        }

        .content-box .card-content {
          margin-top: 10px;
          font-size: 12px;
          font-weight: 700;
          color: white;
          transition: all 0.5s ease-in-out;
          transform: translate3d(0px, 0px, 30px);
        }

        .content-box .card-content:hover {
          transform: translate3d(0px, 0px, 60px);
        }

        .content-box .see-more {
          cursor: pointer;
          margin-top: 1rem;
          display: inline-block;
          font-weight: 900;
          font-size: 9px;
          text-transform: uppercase;
          color: rgb(7, 185, 255);
          background: white;
          padding: 0.5rem 0.7rem;
          transition: all 0.5s ease-in-out;
          transform: translate3d(0px, 0px, 20px);
        }

        .content-box .see-more:hover {
          transform: translate3d(0px, 0px, 60px);
        }

        .date-box {
          position: absolute;
          top: 30px;
          right: 30px;
          height: 60px;
          width: 60px;
          background: white;
          border: 1px solid rgb(7, 185, 255);
          padding: 10px;
          transform: translate3d(0px, 0px, 80px);
          box-shadow: rgba(100, 100, 111, 0.2) 0px 17px 10px -10px;
        }

        .date-box span {
          display: block;
          text-align: center;
        }

        .date-box .month {
          color: rgb(4, 193, 250);
          font-size: 9px;
          font-weight: 700;
        }

        .date-box .date {
          font-size: 20px;
          font-weight: 900;
          color: rgb(4, 193, 250);
        }

        /* テーマカラーのスタイル */
        .theme-purple .content-box {
          background: rgba(128, 0, 128, 0.8); /* 紫 */
        }

        .theme-green .content-box {
          background: rgba(0, 128, 0, 0.8); /* 緑 */
        }

        .theme-yellow .content-box {
          background: rgba(255, 255, 0, 0.8); /* 黄色 */
        }

        .theme-blue .content-box {
          background: rgba(0, 0, 255, 0.8); /* 青 */
        }

        .theme-pink .content-box {
          background: rgba(255, 192, 203, 0.8); /* ピンク */
        }
      `}</style>
    </div>
  );
};

export default ThreeDCard;
