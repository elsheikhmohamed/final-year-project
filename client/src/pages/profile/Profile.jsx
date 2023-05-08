import "./profile.scss";

import SchoolIcon from "@mui/icons-material/School";
import noUser from "../../assets/defaultProfilePic.png";

import { AuthContext } from "../../context/authContext";
import Posts from "../../components/posts/Posts";
import { useContext, useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res) => {
      return res.data;
    })
  );

  const { isLoading: followersCountIsLoading, data: followersCountData } =
    useQuery(["followersCount"], () =>
      makeRequest
        .get("/relationships/followers-count/" + userId)
        .then((res) => {
          return res.data;
        })
    );

  const { isLoading: followingCountIsLoading, data: followingCountData } =
    useQuery(["followingCount"], () =>
      makeRequest
        .get("/relationships/following-count/" + userId)
        .then((res) => {
          return res.data;
        })
    );

  const { isLoading: relationshipIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/relationships?followedUserId=" + userId).then((res) => {
        return res.data;
      })
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.id));
  };
  useEffect(() => {
    if (!mutation.isLoading) {
      queryClient.invalidateQueries(["followersCount"]);
      queryClient.invalidateQueries(["followingCount"]);
    }
  }, [mutation.isLoading, queryClient]);
  

  return (
    <section className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="profilePicContainer">
            <img
              src={data?.profilePic ? `/upload/${data?.profilePic}` : noUser}
              alt="user profile"
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left">
                <h2>{data?.name}</h2>
                <p>@{data?.username}</p>
              </div>
              <div className="right">
                <div className="item">
                  <SchoolIcon />
                  <span>{data?.university}</span>
                </div>
              </div>
              <div className="center">
                <div className="info">
                  <div className="item">
                    <span>
                      {followersCountIsLoading
                        ? "Loading..."
                        : followersCountData?.followers + " Followers"}
                    </span>
                  </div>
                  <div className="item">
                    <span>
                      {followingCountIsLoading
                        ? "Loading..."
                        : followingCountData?.following + " Following"}
                    </span>
                  </div>
                </div>
                {relationshipIsLoading ? (
                  "Loading"
                ) : userId === currentUser.id ? (
                  <button onClick={() => setOpenUpdate(true)}>
                    Edit Profile
                  </button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id)
                      ? "Following"
                      : "Follow"}
                  </button>
                )}
              </div>
              <br />
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </section>
  );
};

export default Profile;
