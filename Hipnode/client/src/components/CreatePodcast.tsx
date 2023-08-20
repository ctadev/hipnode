import React from 'react';
import { useForm } from '../../hooks/useForm.ts';

const PodcastInitialData = {
  title: '',
  content: '',
  artist: '',
  state: '',
  country: '',
};

const FormFields = [
  { name: 'title' },
  { name: 'content' },
  { name: 'artist' },
  { name: 'state' },
  { name: 'country' },
];

const CreatePodcast = () => {
  const { state, handleChange, handleSubmit, resetForm } = useForm({
    initialState: PodcastInitialData,
    onSubmit: async (values) => {
      try {
        const { token } = JSON.parse(localStorage.getItem('user') as never);

        const response = await fetch(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/podcasts`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
          },
        );

        if (response.ok) {
          resetForm();
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {FormFields.map((field) => (
        <input
          key={field.name}
          name={field.name}
          value={state[field.name]}
          onChange={handleChange(field.name)}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePodcast;
