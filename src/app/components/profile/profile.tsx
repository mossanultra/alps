import React from 'react';

type ProfileProps = {
  profileImage: string;
  username: string;
  bio: string;
  followers: number;
  following: number;
};

const Profile: React.FC<ProfileProps> = ({
  profileImage,
  username,
  bio,
  followers,
  following,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <img src={profileImage} alt="Profile" style={styles.profileImage} />
        <h2 style={styles.username}>{username}</h2>
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  profileHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '16px',
  },
  profileImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    marginBottom: '8px',
  },
  username: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: 0,
  },
  bio: {
    fontSize: '16px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '16px',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: '16px',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statCount: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Profile;
