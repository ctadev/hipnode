import { useMutation } from 'react-query';

import { getLikes } from '../queries/getLikesMutation';
import { postLike } from '../queries/postLikeMutation';
import { unlikePost } from '../queries/unlikePostMutation';
import { getCommentLikes } from '../queries/getCommentLikesMutation';
import { commentLike } from '../queries/commentLikeMutation';
import { unlikeComment } from '../queries/unlikeCommentMutation';

type MutationInput = {
  data: { post_id: number; user_id: number };
  token: string;
};

export const useGetLikes = () => {
  const getLikesMutation = useMutation(getLikes, {
    onError: (error) => {
      // handle error
    },
    onSuccess: (result) => {
      return result;
    },
  });

  return getLikesMutation;
};

export const usePostLike = () => {
  const postLikeMutation = useMutation(
    ({ data, token }: MutationInput) => postLike(data, token),
    {
      onError: (error) => {
        // handle error
      },
      onSuccess: (result) => {
        return result;
      },
    },
  );

  return postLikeMutation;
};

export const usePostUnlike = () => {
  const unlikePostMutation = useMutation(
    ({ data, token }: MutationInput) => unlikePost(data, token),
    {
      onError: (error) => {
        // handle error
      },
      onSuccess: (result) => {
        return result;
      },
    },
  );

  return unlikePostMutation;
};

export const useGetCommentLikes = () => {
  const getCommentLikesMutation = useMutation(getCommentLikes, {
    onError: (error) => {
      // handle error
    },
    onSuccess: (result) => {
      return result;
    },
  });

  return getCommentLikesMutation;
};

export const useCommentLike = () => {
  const commentLikeMutation = useMutation(
    ({ data, token }: MutationInput) => commentLike(data, token),
    {
      onError: (error) => {
        // handle error
      },
      onSuccess: (result) => {
        return result;
      },
    },
  );

  return commentLikeMutation;
};

export const useCommentUnlike = () => {
  const unlikeCommentMutation = useMutation(
    ({ data, token }: MutationInput) => unlikeComment(data, token),
    {
      onError: (error) => {
        // handle error
      },
      onSuccess: (result) => {
        return result;
      },
    },
  );

  return unlikeCommentMutation;
};
