import { useState } from "react";

interface UseFormOptions {
  initialState: { [key: string]: string };
  onSubmit: (values: { [key: string]: string }) => void;
}

export const useForm = ({ initialState, onSubmit }: UseFormOptions) => {
  const [state, setState] = useState(initialState);

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  const resetForm = () => {
    setState(initialState);
  };

  return {
    state,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
