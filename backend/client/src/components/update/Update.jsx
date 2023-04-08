import "./update.scss";
import { useState } from "react";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const Update = ({ setOpenUpdate, user }) => {
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    university: "",
  });

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
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
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

    //TODO: find a better way to get image URL
    
    let profileUrl;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    
    mutation.mutate({ ...texts, profilePic: profileUrl });
    setOpenUpdate(false);
    setProfile(null);
  };
  return (
    <div className="update">
      Update
      <form>
        <input type="file" on onChange={e=> setProfile(e.target.files[0])}/>
        <input type="text" name="name" onChange={handleChange} />
        <input type="text" name="university" onChange={handleChange} />
        <button onClick={handleClick} >Update</button>
      </form>
      <button onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  );
};

export default Update;
