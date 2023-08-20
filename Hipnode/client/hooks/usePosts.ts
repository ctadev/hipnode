import { useMutation } from 'react-query';

import { getPosts } from '../queries/getPostsMutation';
import { getPost } from '../queries/getPostMutation';
import { getComments } from '../queries/getCommentsMutation';
import { reportPost } from '../queries/reportPostMutation';
import { createComment } from '../queries/createCommentMutation';

type MutationInput = {
  data: { post_id: string; user_id: string; content: string };
  token: string;
};

export const useGetPosts = () => {
  const getPostsMutation = useMutation(() => getPosts(), {
    onError: (error) => {
      // handle error
    },
    onSuccess: (result) => {
      return result;
    },
  });

  return getPostsMutation;
};

export const useGetPost = () => {
  const getPostMutation = useMutation((id: string) => getPost(id), {
    onError: (error) => {
      // handle error
    },
    onSuccess: (result) => {
      return result;
    },
  });

  return getPostMutation;
};

export const useReportPost = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const reportPostMutation = useMutation(
    (reportInfo: any) => reportPost(loggedInUser, reportInfo),
    {
      onError: (error) => {
        // handle error
      },
    },
  );

  return reportPostMutation;
};

export const useGetComments = () => {
  const getCommentsMutation = useMutation((id: string) => getComments(id), {
    onError: (error) => {
      // handle error
    },
    onSuccess: (result) => {
      return result;
    },
  });

  return getCommentsMutation;
};

export const useCreateComment = () => {
  const createCommentMutation = useMutation(
    ({ data, token }: MutationInput) => createComment(data, token),
    {
      onError: (error) => {
        // handle error
      },
      onSuccess: (result) => {
        return result;
      },
    },
  );

  return createCommentMutation;
};
