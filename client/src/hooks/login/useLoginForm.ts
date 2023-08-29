import { ChangeEvent, useState } from 'react';
import { ILoginUser } from '../../views/SigninPage';

interface UseLoginForm {
  user: ILoginUser;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

export const useLoginForm = (initialState: ILoginUser): UseLoginForm => {
  const [user, setUser] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = (): void => {
    setUser(initialState);
  };

  return {
    user,
    handleInputChange,
    resetForm,
  };
};
