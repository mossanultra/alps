// ContentGrid.tsx
import React, { useEffect, useState } from "react";
import styles from "./content-grid.module.css";
import HamstarLoader from "../../loading/hamster/hamster";
import ModalDialog from "../../map/modal-modal/modal-dialog";
import ContentCard from "../content-card/content-card"; // インポート

type Post = {
  guid: string;
  text: string;
  imageBase64: string;
};

export default function ContentGrid() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/post", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <HamstarLoader />;
  }

  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.grid2}>
        {posts.map((post) => (
          <ContentCard
            key={post.guid}
            post={post}
            onClick={() => {
              setSelectedPost(post);
              setModalOpen(true);
            }}
          />
        ))}
        {modalOpen && selectedPost && (
          <ModalDialog onClose={handleCloseModal}>
            <div className={styles.modaldiv}>
              <div className={styles.dialogSubText}>山口県&nbsp;萩市</div>
              <img
                src={selectedPost.imageBase64}
                alt={selectedPost.guid}
                className={styles.dialogImage}
              />
              <div className={styles.dialogText}>{selectedPost.text}</div>
            </div>
          </ModalDialog>
        )}
      </div>
    </>
  );
}
