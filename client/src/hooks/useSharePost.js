import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";

export const useSharePost = () => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  return { currentUser, mutation };
};
