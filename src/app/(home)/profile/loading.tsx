const Loading = () => {
  return <div style={styles.loading}>Loading...</div>;
};

const styles: { [key: string]: React.CSSProperties } = {
  loading: {
    textAlign: "center",
    fontSize: "18px",
    color: "#666",
  },
};

export default Loading;
