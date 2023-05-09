import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./post.scss";

// Import icons
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

// Import context, hooks, and utilities
import { AuthContext } from "../../context/authContext";
import Comments from "../comments/Comments";
import moment from "moment";
import { useFetchLikes } from "../../hooks/useFetchLikes";
import { useFetchComments } from "../../hooks/useFetchComments";
import { useHandleLike } from "../../hooks/useHandleLike";
import { useHandleDelete } from "../../hooks/useHandleDelete";
import { makeRequest } from "../../axios";

const Post = ({ post }) => {
  // State variables for toggling comment and menu sections
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // Custom hooks for fetching likes and comments
  const { isLoading, data: likesData } = useFetchLikes(post.id);
  const { data: commentsData } = useFetchComments(post.id);

  // Custom hooks for handling like and delete actions
  const { handleLike } = useHandleLike(post.id, likesData, currentUser?.id);
  const { handleDelete } = useHandleDelete(post.id);

  // State variable for storing post creator data
  const [postCreatorData, setPostCreatorData] = useState(null);

  // Fetch post creator data when post.userId changes
  useEffect(() => {
    const fetchPostCreatorData = async () => {
      const response = await makeRequest.get("/users/find/" + post.userId);
      setPostCreatorData(response.data);
    };

    fetchPostCreatorData();
  }, [post.userId]);

  return (
    <div className="post">
      <div className="container">
        {/* User section */}
        <div className="user">
          <div className="userInfo">
            <Link to={`/profile/${post.userId}`}>
              {postCreatorData && (
                <img
                  src={`/upload/${postCreatorData.profilePic}`}
                  alt="User Profile"
                  className="user-image"
                />
              )}
            </Link>
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdDate).fromNow()}</span>
            </div>
          </div>
          {/* Menu icon and delete button */}
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>delete</button>
          )}
        </div>

        {/* Content section */}
        <div className="content">
          <p>{post.desc}</p>
          {post.img.endsWith(".pdf") ? (
            <div
              className="pdf-container"
              style={{ height: "842px", overflow: "auto" }}
            >
              <embed
                className="post-pdf"
                src={`/upload/${post.img}`}
                type="application/pdf"
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <img src={`/upload/${post.img}`} alt="" />
          )}
        </div>

        {/* Post information (likes and comments) */}
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : likesData.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {likesData?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentsData?.length} Comments
          </div>
        </div>

        {/* Render Comments component when commentOpen is true */}
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
