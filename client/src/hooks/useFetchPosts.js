import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useFetchPosts = (userId) => {
  const { isLoading, error, data } = useQuery(["posts"], () => {
    console.log("accessToken:", document.cookie);
    return makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    });
  });

  return { isLoading, error, data };
};
