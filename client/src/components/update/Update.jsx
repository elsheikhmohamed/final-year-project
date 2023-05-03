import "./update.scss";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({ setOpenUpdate, user }) => {
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name,
    university: user.university,
  });
  
  const [tempTexts, setTempTexts] = useState({ ...texts });

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setProfile(e.target.files[0]);
    } else {
      setTempTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
  
    let profileUrl;
    if (profile) {
      profileUrl = await upload(profile);
    } else {
      profileUrl = user.profilePic;
    }
  
    const updatedUser = {
      ...user,
      ...tempTexts,
      profilePic: profileUrl,
    };
  
    setTexts(tempTexts); // Add this line to update the 'texts' state with the values from 'tempTexts'
  
    mutation.mutate(updatedUser);
    setOpenUpdate(false);
    setProfile(null);
  };
  
  

  return (
    <div className="update-container">
      <h2>Update</h2>
      <form className="update-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          value={tempTexts.name}
          onChange={handleChange}
        />
        <label htmlFor="university">University:</label>
        <input
          type="text"
          name="university"
          id="university"
          value={tempTexts.university}
          onChange={handleChange}
        />
        <label htmlFor="profilePic">Profile Picture:</label>
        <div className="imgContainer">
          <img src={`/upload/${user.profilePic}`} alt="Profile" />
        </div>
        <input
          type="file"
          name="profilePic"
          id="profilePic"
          accept="image/*"
          onChange={(e) => setProfile(e.target.files[0])}
        />
        <button className="update-submit-btn" onClick={handleClick}>
          Update
        </button>
      </form>
      <button className="update-close-btn" onClick={() => setOpenUpdate(false)}>
        X
      </button>
    </div>
  );
};

export default Update;
