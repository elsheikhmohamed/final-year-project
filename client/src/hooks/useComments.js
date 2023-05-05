import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../axios';
import  { useContext } from 'react';
import { UserDataContext } from '../context/userDataContext';

export const useComments = (postId) => {
  const queryClient = useQueryClient();
  const { userData } = useContext(UserDataContext);

  // Fetch comments data for the given post id
  const { isLoading, error, data } = useQuery(['comments'], () =>
    makeRequest.get('/comments?postId=' + postId).then((res) => {
      return res.data;
    })
  );

  // Create mutation to post new comments
  const addCommentMutation = useMutation(
    (newComment) => {
      return makeRequest.post('/comments', newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch to get updated data
        queryClient.invalidateQueries(['comments']);
      },
    }
  );

  const getCommentUserData = (userId) => {
    return userId ? userData[userId] : null;
  };

  const updatedData = data?.map((comment) => {
    const commentUserData = getCommentUserData(comment.userId);
    return {
      ...comment,
      user: commentUserData,
    };
  });

  return { isLoading, error, data: updatedData, addCommentMutation };
};
