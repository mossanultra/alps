import React, { useEffect } from "react";
import HamstarLoader from "../loading/hamster/hamster";
import { useProfile } from "@/hooks/useProfile";

type ProfileProps = {
  profileImage: string;
  username: string;
  bio: string;
  followers: number;
  following: number;
  userId: string;
};

const Profile: React.FC<ProfileProps> = ({
  bio,
  followers,
  following,
  userId,
}) => {
  const { profile, fetchProfile } = useProfile();

  useEffect(() => {
    fetchProfile(userId);
  }, [fetchProfile, userId]);

  if (profile === null) {
    <HamstarLoader />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <img
          src={profile?.userIcon}
          alt="Profile"
          style={styles.profileImage}
        />
        <h2 style={styles.username}>{profile?.userName}</h2>
      </div>
      <p style={styles.bio}>{bio}</p>
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <span style={styles.statCount}>{followers}</span>
          <span>Followers</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statCount}>{following}</span>
          <span>Following</span>
        </div>
      </div>
      <button style={styles.button}>Follow</button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "0 auto",
    backgroundColor: "transparent",
    borderRadius: "8px",
    // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
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
