import React, { useContext, useState } from 'react';

// Styles
import './comments.scss';

// Context
import { AuthContext } from '../../context/authContext';

// Moment.js
import moment from 'moment';

// Custom Hooks
import { useComments } from '../../hooks/useComments';

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState('');
  const { currentUser } = useContext(AuthContext);

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
      <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick} disabled={!desc.trim()}>
          Send
        </button>
      </div>
      {error ? (
        "Something went wrong"
      ) : isLoading ? (
        "loading"
      ) : (
        data.map((comment) => (
          <div className="comments-comment" key={comment.id}>
            <img src={"/upload/" + comment.profilePic} alt="" />
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
