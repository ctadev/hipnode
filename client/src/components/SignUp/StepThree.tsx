import React, { useState } from 'react';
import { stepthree } from '../../constants/category';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../services/apiService/userApi';
import { setRegisteredUser } from '../../app/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

type User = {
  username: string;
  email: string;
  password: string;
};

const StepThree = () => {
  const [selectedTags, setSelectedTags] = useState([
    stepthree[3].title,
    stepthree[4].title,
    stepthree[6].title,
  ]);

  const [errMsg, setErrMsg] = useState<string>('');

  const { registeredUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const clearRegisteredUser = () => {
    dispatch(setRegisteredUser({ name: 'username', value: '' }));
    dispatch(setRegisteredUser({ name: 'email', value: '' }));
    dispatch(setRegisteredUser({ name: 'password', value: '' }));
  };

  const mutation = useMutation({
    mutationFn: async (user: User) => await registerUser(user),
    onSuccess: (data) => {
      clearRegisteredUser();
      navigate('/sign-in');
    },
    onError: (err: any) => setErrMsg(err?.message),
  });

  const handleClick = () => {
    mutation.mutate(registeredUser);
  };

  return (
    <main className="lg:h-screen lg:w-1/2 bg-white dark:bg-dark-main-bg flex flex-col items-center justify-center dark:text-white py-[50px]">
      <section className="flex flex-col gap-2 items-start max-w-[450px] w-full">
        <h1 className="text-3xl font-bold">
          What Types of businesses are you most interested in running?
        </h1>

        <p className="mt-8 font-semibold text-cyan-400 dark:text-cyan-400">
          Choose as many as you like.
        </p>

        <ul className={`flex flex-wrap gap-5 w-full`}>
          {stepthree.map((item) => (
            <li
              key={item.id}
              className={`py-5 font-semibold text-lg w-fit rounded-lg px-4 cursor-pointer hover:bg-alt-2 dark:hover:bg-alt-2 ${
                selectedTags.includes(item.title)
                  ? 'bg-alt-2 dark:bg-alt-2'
                  : 'dark:bg-dark-secondary-bg bg-main-bg'
              }`}
              onClick={() => toggleTag(item.title)}
            >
              {item.title}
            </li>
          ))}
        </ul>

        {errMsg && errMsg}

        <button
          onClick={handleClick}
          className="bg-alt-2 text-white h-[50px] rounded-lg px-9 mt-5 font-bold hover:bg-primary-orange"
        >
          Get Started
        </button>
      </section>
    </main>
  );
};

export default StepThree;
