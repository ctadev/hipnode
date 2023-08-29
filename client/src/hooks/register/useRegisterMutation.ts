import { Dispatch } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../services/apiService/userApi';
import { useNavigate } from 'react-router';
import { IRegisterUser } from '../../views/SignupPage';

export const useRegisterMutation = (
  user: IRegisterUser,
  resetForm: () => void, 
  setError: Dispatch<React.SetStateAction<string>>,
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => await registerUser(user),
    onSuccess: () => {
      navigate('/sing-in');
      resetForm();
    },
    onError: (err: any) => setError(err.message),
  });
};
