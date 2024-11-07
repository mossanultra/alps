import React, { useState } from "react";

type PostFormProps = {
  profileImage: string;
  username: string;
  onPostCreated: () => void; // 投稿成功後のコールバック
};

const PostForm: React.FC<PostFormProps> = ({
  profileImage,
  username,
  onPostCreated,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [text, setText] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedImage || !text) {
      alert("Please select an image and write some text.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("text", text);

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Post created successfully!");
        onPostCreated(); // 投稿成功後の処理を実行
        setSelectedImage(null);
        setText("");
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post");
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src={profileImage} alt="Profile" style={styles.profileImage} />
        <span style={styles.username}>{username}</span>
      </header>
      <div style={styles.form}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.fileInput}
        />
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            style={styles.imagePreview}
          />
        )}
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Write a caption..."
          style={styles.textArea}
        />
        <button onClick={handleSubmit} style={styles.submitButton}>
          Post
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "transparent",
    borderRadius: "8px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "16px",
  },
  profileImage: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  username: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  fileInput: {
    marginBottom: "10px",
  },
  imagePreview: {
    width: "100%",
    height: "auto",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  textArea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    borderColor: "#ddd",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PostForm;
