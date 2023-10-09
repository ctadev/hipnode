import React, { useState } from 'react';
import { stepone } from '../../constants/category';
import { Link } from 'react-router-dom';

const StepOne = () => {
  const [selectedTags, setSelectedTags] = useState(stepone[3].id);

  return (
    <main className="lg:h-screen lg:w-1/2 bg-white dark:bg-dark-main-bg flex flex-col items-center justify-center dark:text-white py-[50px]">
      <section className="flex flex-col gap-2 items-start max-w-[450px] w-full">
        <h1 className="text-3xl font-bold">
          Which best describes the stage you're at right now?
        </h1>

        <ul className={`flex flex-col gap-5 w-full mt-8`}>
          {stepone.map((item) => (
            <li
              key={item.id}
              className={`py-5 w-full font-semibold text-lg rounded-lg px-4  cursor-pointer hover:bg-alt-2 dark:hover:bg-alt-2 ${
                selectedTags === item.id
                  ? 'bg-alt-2 dark:bg-alt-2'
                  : 'dark:bg-dark-secondary-bg bg-main-bg'
              }`}
              onClick={() => setSelectedTags(item.id)}
            >
              {item.title}
            </li>
          ))}
        </ul>

        <Link to="/sign-up/next-step-two">
          <button className="bg-alt-2 hover:bg-primary-orange text-white h-[50px] rounded-lg px-9 mt-5 font-bold">
            Next
          </button>
        </Link>
      </section>
    </main>
  );
};

export default StepOne;
