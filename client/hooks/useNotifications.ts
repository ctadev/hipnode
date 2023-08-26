import { useMutation } from 'react-query';

import { getNotifications } from '../queries/getNotificationsMutation';
import { postNotification } from '../queries/postNotificationMutation';
import { clearNotifications } from '../queries/clearNotificationsMutation';

type MutationInput = {
  data: {
    type?: string;
    post_id?: number;
    user_id?: number;
    comment_id?: number;
    from_user_id?: number;
  };
  token: string;
};

export const useGetNotifications = () => {
  const getNotificationsMutation = useMutation(getNotifications, {
    onError: (error: Error) => {
      // error
    },
    onSuccess: (result) => {
      return result;
    },
  });

  return getNotificationsMutation;
};

export const usePostNotification = () => {
  const postNotificationMutation = useMutation(
    ({ data, token }: MutationInput) => postNotification(data, token),
    {
      onError: (error: Error) => {
        // error
      },
      onSuccess: (result) => {
        return result;
      },
    },
  );
  return postNotificationMutation;
};

export const useClearNotifications = () => {
  const clearNotificationsMutation = useMutation(
    ({ data, token }: MutationInput) => clearNotifications(data, token),
    {
      onError: (error: Error) => {
        // error
      },
      onSuccess: (result) => {
        return result;
      },
    },
  );
  return clearNotificationsMutation;
};
