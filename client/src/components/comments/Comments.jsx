import React, { useContext, useState } from 'react';
import noUser from "../../assets/defaultProfilePic.png";

import './comments.scss';

import { AuthContext } from '../../context/authContext';
import { useUserData } from "../../context/userDataContext";

import moment from 'moment';

import { useComments } from '../../hooks/useComments';

const Comments = ({ postId }) => {

  const [desc, setDesc] = useState('');
  const { currentUser } = useContext(AuthContext);
  const { userData } = useUserData();
  const user = userData[currentUser.id] || currentUser;

  // Custom hook for fetching and adding comments
  const { isLoading, error, data, addCommentMutation } = useComments(postId);

  // Handle submit of new comment
  const handleClick = async (e) => {
    e.preventDefault();
    addCommentMutation.mutate({ desc, postId });
    setDesc('');
  };

  return (
    <div className="comments">
      <div className="comments-write">
        <img
          src={user.profilePic ? "/upload/" + user.profilePic : noUser}
          alt="User Profile"
        />

        <input
          type="text"
          placeholder="Write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick} disabled={!desc.trim()}>
          Send
        </button>
      </div>
      {error ? (
        <div>Something went wrong</div>
      ) : isLoading ? (
        <div>Loading</div>
      ) : (
        data.map((comment) => (
          <div className="comments-comment" key={comment.id}>
            <img
              src={comment.profilePic ? "/upload/" + comment.profilePic : noUser}
              alt="User Profile"
            />
            <div className="comments-info">
              <span>{comment.name}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="comments-date">
              {moment(comment.createdDate).fromNow()}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default Comments;
