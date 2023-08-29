import { useState, ChangeEvent } from 'react';
import { IRegisterUser } from '../../views/SignupPage';

interface UseRegisterForm {
  user: IRegisterUser;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

export function useRegisterForm(initialState: IRegisterUser): UseRegisterForm {
  const [user, setUser] = useState(initialState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setUser(initialState);
  };

  return {
    user,
    handleInputChange,
    resetForm,
  };
}
