import Post from "../post/Post";
import "./posts.scss";
import { useFetchPosts } from "../../hooks/useFetchPosts";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useFetchPosts(userId);

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;