import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useHandleDelete = (postId) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(postId);
  };

  return { handleDelete };
};
