import { useMutation } from 'react-query';

import { getUsers } from '../queries/getUsersMutation';

export const useGetUsers = () => {
    const getUsersMutation = useMutation(getUsers, {
        onError: (error) => {
           // handle error
        },
        onSuccess: (result) => {
            return result;
        },
    });

    return getUsersMutation;
}
