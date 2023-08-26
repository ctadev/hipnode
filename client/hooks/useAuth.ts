import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';

import { loginUser } from '../queries/loginMutation';
import { registerUser } from '../queries/registerMutation';
import { useDispatch } from 'react-redux';
import { loggedinUser } from '../src/app/userSlice';

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  email: string;
  password: string;
  username: string;
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginMutation = useMutation(loginUser, {
    onError: () => {
      toast.error('Something went wrong.');
    },
    onSuccess: (result) => {
      if (result.message === 'Invalid email or password') {
        toast.error('Invalid email or password');
      } else if (result.token) {
        localStorage.setItem('user', JSON.stringify(result));
        navigate('/');
      }
      dispatch(loggedinUser());
    },
  });

  const login = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  return { login, status: loginMutation.status };
};

export const useRegisterUser = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation(registerUser, {
    onError: () => {
      toast.error('Something went wrong.');
    },
    onSuccess: (result) => {
      if (result.message === 'User already exists.') {
        toast.error('User already exists.');
      } else if (result.message === 'All fields are required.') {
        toast.error('All fields are required');
      } else {
        localStorage.setItem('user', JSON.stringify(result));
        toast.success('User created successfully');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      }
    },
  });

  const register = (data: RegisterData) => {
    registerMutation.mutate(data);
  };

  return { register, status: registerMutation.status };
};
