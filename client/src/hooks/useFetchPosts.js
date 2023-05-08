import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useFetchPosts = (userId) => {
  const { isLoading, error, data } = useQuery(["posts", userId], () => {
    // console.log("accessToken:", document.cookie);
    const queryParams = userId ? `?userId=${userId}` : "";
    return makeRequest.get("/posts" + queryParams).then((res) => {
      return res.data;
    });
  });

  return { isLoading, error, data };
};
