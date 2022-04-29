import { useState } from "react";
import styles from "../styles/Form.module.css";
import { API_URL } from "./../config/index";
import { toast, ToastContainer } from "react-toastify";

export default function ImageUpload({ evtId, imageUploaded }) {
  const [image, setImage] = useState(null);
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) return imageUploaded();
    toast.error("Something Went Wrong!");
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div className={styles.form}>
      <ToastContainer />
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" className="btn" value="Upload" />
      </form>
    </div>
  );
}
