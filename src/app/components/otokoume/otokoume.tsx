import HoloEffectCard from "../holocard/holoEffectCard";

const styles = {
  subtitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  canvasContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "16px",
  },
  container: {
    height: "700px",
    width: "100%",
  },
  canvas: {
    padding: "0 4px",
    display: "block",
    width: "100%",
    height: "100%",
  },
};

export default function Otokoume() {
  return (
    <div>
      <p style={styles.subtitle}>
        隠れミッキー（中国）もいるよ！！
      </p>

      <div style={styles.canvasContainer}>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <div style={styles.container}>
              <HoloEffectCard
                image={"otokoume.jpg"}
                position={[0, 0, 0]}
                style={styles.canvas}
                enableOrbitContorls={true}
              />
            </div>
          </li>
          <li style={styles.listItem}>
            <div style={styles.container}>
              <HoloEffectCard
                image={"china.jpg"}
                position={[0, 0, 0]}
                style={styles.canvas}
                enableOrbitContorls={true}
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
