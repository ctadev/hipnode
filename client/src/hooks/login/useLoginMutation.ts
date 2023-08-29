import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginUser } from '../../services/apiService/userApi';
import { signinUser } from '../../app/userSlice';
import { setUserToLocalStorage } from '../../services/authService/userAuth';
import { ILoginUser } from '../../views/SigninPage';

export const useLoginMutation = (
  user: ILoginUser,
  resetForm: () => void,
  onError: (err: any) => void,
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => await loginUser(user),
    onSuccess: (data) => {
      dispatch(signinUser(data));
      setUserToLocalStorage(data);
      resetForm();
      navigate('/');
    },
    onError,
  });
};
