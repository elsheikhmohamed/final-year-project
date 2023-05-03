import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";

export const useHandleLike = (postId, likesData, currentUserId) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + postId);
      return makeRequest.post("/likes", { postId });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["likes"]);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(likesData.includes(currentUserId));
  };

  return { handleLike };
};
