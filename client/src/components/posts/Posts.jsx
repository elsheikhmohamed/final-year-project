import Post from "../post/Post";
import "./posts.scss";
import { useFetchPosts } from "../../hooks/useFetchPosts";

function getUniquePosts(posts) {
  if (!posts) return []; // if posts is null, return empty array

  const seen = new Set();
  return posts.filter((post) => {
    if (seen.has(post.id)) {
      return false;
    } else {
      seen.add(post.id);
      return true;
    }
  });
}

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useFetchPosts(userId);

  const uniquePosts = getUniquePosts(data);

  return (
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : uniquePosts.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
