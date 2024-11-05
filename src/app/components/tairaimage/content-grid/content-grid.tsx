import "./content-grid.css";
export default function ContentGrid() {
  return (
    <div className="grid2">
      {[...Array(6)].map((_, index) => (
        <div className="card2" key={`card-${index}`}>
          <div
            className="card-image2"
            style={{
              backgroundImage:
                "url('https://t3.ftcdn.net/jpg/02/65/23/70/360_F_265237090_Muthvb72m2POYFjyx7F5UCQLh9JdBtKN.jpg')",
            }}
          />
          <div className="card-text">本文を追加</div>
          <div className="card-subtext">山口県&nbsp;萩市</div>
        </div>
      ))}
    </div>
  );
}
