import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useFetchLikes = (postId) => {
  return useQuery(["likes", postId], () =>
    makeRequest.get("/likes?postId=" + postId).then((res) => {
      return res.data;
    })
  );
};