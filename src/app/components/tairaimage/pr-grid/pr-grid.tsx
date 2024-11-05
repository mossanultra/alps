import "./pr-grid.css";

export default function PrGrid() {
  return (
    <div className="grid">
      {[...Array(3)].map((_, index) => (
        <div className="card ad" key={`ad-${index}`}>
          <div
            className="card-image"
            style={{
              backgroundImage:
                "url('https://craft-gin.info/wp-content/uploads/2020/03/20200320020532-1024x447.png')",
            }}
          />
          <div className="card-text">広告</div>
        </div>
      ))}
    </div>
  );
}
