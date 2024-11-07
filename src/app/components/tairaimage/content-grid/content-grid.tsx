import React, { useEffect, useState } from "react";
import styles from "./content-grid.module.css";
import HamstarLoader from "../../loading/hamster/hamster";
import ModalDialog from "../../map/modal-modal/modal-dialog";
import Image from "next/image";

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
    return <HamstarLoader></HamstarLoader>;
  }
  const handleCloseModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className={styles.grid2}>
        {posts.map((post) => (
          <div
            className={styles.card2}
            key={post.guid}
            onClick={() => {
              console.log("modal on");
              setSelectedPost(post);
              setModalOpen(true);
            }}
          >
            {/* <div className={styles.cardImage2}> */}
            {/* Base64画像を<img>タグで表示 */}
            <img
              src={post.imageBase64}
              alt={post.text}
              className={styles.cardImage2}
            />
            {/* </div> */}
            <div className={styles.cardText}>{post.text}</div>
            <div className={styles.cardSubtext}>山口県&nbsp;萩市</div>
          </div>
        ))}
        {modalOpen && (
          <ModalDialog onClose={handleCloseModal}>
            <div className={styles.modaldiv}>
            <div className={styles.cardSubtext}>山口県&nbsp;萩市</div>
            <img
                src={selectedPost?.imageBase64}
                alt={selectedPost?.guid}
                className={styles.cardImage2}
              />
              {/* </div> */}
              <div className={styles.modaltext}>{selectedPost?.text}</div>
            </div>
          </ModalDialog>
        )}
      </div>
    </>
  );
}
