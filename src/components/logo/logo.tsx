const DanielLogo = () => {
  return (
    <svg
      width="200"
      height="60"
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* "daniel" のロゴテキスト */}
      <text
        x="10"
        y="45"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fontWeight="bold"
        fill="#2D5F2E"
      >
        daniel
      </text>

      {/* コミュニケーションを表す吹き出し */}
      <circle cx="160" cy="20" r="6" fill="#FF9800" />
      <circle cx="175" cy="20" r="6" fill="#FF9800" />
      <circle cx="190" cy="20" r="6" fill="#FF9800" />

      {/* 地域のつながりを表す曲線 */}
      <path
        d="M10 50 Q100 10, 190 50"
        stroke="#2D5F2E"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
};

export default DanielLogo;
