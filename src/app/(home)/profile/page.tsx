import { fetchProfile } from "@/features/profile/hooks/useProfile";
import { auth } from "../../../../auth";

const Profile = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }
  const profile = await fetchProfile(session.user.id);

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <img
          src={profile!.userIcon}
          alt="Profile"
          style={styles.profileImage}
        />
        <h2 style={styles.username}>{profile!.userName}</h2>
      </div>
      <p style={styles.bio}></p>
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <span style={styles.statCount}>100</span>
          <span>Followers</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statCount}>200</span>
          <span>Following</span>
        </div>
      </div>
      <button style={styles.button}>Follow</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  error: {
    textAlign: "center",
    fontSize: "18px",
    color: "red",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "transparent",
    borderRadius: "8px",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "16px",
  },
  profileImage: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "8px",
  },
  username: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  bio: {
    fontSize: "16px",
    color: "#666",
    textAlign: "center",
    marginBottom: "16px",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: "16px",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  statCount: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Profile;
