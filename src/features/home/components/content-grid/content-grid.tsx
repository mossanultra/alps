// ContentGrid.tsx
import styles from "./content-grid.module.css";
import ContentCard from "../content-card/content-card";
import { fetchPost } from "@/features/post/services/fetchPost";

export default async function ContentGrid() {

  const posts = await fetchPost();

  if(posts === null) {
    return <div>データが取得できませんでした</div>;
  }


//   const handleCloseModal = () => {
//     setSelectedPost(null);
//     setModalOpen(false);
//   };

  return (
    <>
      <div className={styles.grid2}>
        {posts.map((post) => (
          <ContentCard
            key={post.guid}
            post={post}
            onClick={() => {
            //   setSelectedPost(post);
            //   setModalOpen(true);
            }}
          />
        ))}
        {/* {modalOpen && selectedPost && (
          <ModalDialog onClose={handleCloseModal}>
            <div className={styles.modaldiv}>
              <img
                src={selectedPost.imgSrc}
                alt={selectedPost.guid}
                className={styles.dialogImage}
              />
              <div className={styles.dialogText}>{selectedPost.text}</div>
            </div>
          </ModalDialog>
        )} */}
      </div>
    </>
  );
}