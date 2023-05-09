import Post from "../post/Post";
import "./posts.scss";
import { useFetchPosts } from "../../hooks/useFetchPosts";

// Function to return unique posts
function getUniquePosts(posts) {
  if (!posts) return []; // If posts is null, return empty array

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

// Posts component
const Posts = ({ userId }) => {
  // Fetch posts using the custom hook
  const { isLoading, error, data } = useFetchPosts(userId);

  // Get unique posts
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
