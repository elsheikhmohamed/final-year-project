import "./share.scss";
import { useState } from "react";
import { makeRequest } from "../../axios";

import Upload from "../../assets/upload.png";
import noUser from "../../assets/defaultProfilePic.png";

import { useSharePost } from "../../hooks/useSharePost";
import { useUserData } from "../../context/userDataContext";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { currentUser, mutation } = useSharePost();
  const { userData } = useUserData();
  const user = userData[currentUser.id] || currentUser;

  // Function to upload a file
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle form submission
  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share-container">
      <div className="share-content">
        <div className="share-input-section">
          {/* User image and input */}
          <div className="share-user-image">
            <img
              src={user?.profilePic ? `/upload/${user?.profilePic}` : noUser}
              alt="User Profile"
              className="shareProfilePic"
            />

            <input
              type="text"
              placeholder={`What's on your mind ${user.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          {/* Preview of the selected file */}
          <div className="share-image-preview">
            {file &&
              (file.type === "application/pdf" ? (
                <embed
                  className="file-preview"
                  src={URL.createObjectURL(file)}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              ) : (
                <img
                  className="file-preview"
                  alt=""
                  src={URL.createObjectURL(file)}
                />
              ))}
          </div>
        </div>
        <hr />
        {/* Share actions (add image and submit) */}
        <div className="share-actions">
          <div className="share-add-image">
            <input
              type="file"
              id="file"
              accept="image/*,application/pdf"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor="file">
              <div className="image-upload-item">
                <img src={Upload} alt="" />
                <span>Add Img/PDF</span>
              </div>
            </label>
          </div>
          <div className="share-submit">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
