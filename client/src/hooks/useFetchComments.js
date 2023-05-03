import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useFetchComments = (postId) => {
  return useQuery(["comments", postId], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );
};
