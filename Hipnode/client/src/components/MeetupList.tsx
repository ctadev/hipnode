import React, { useEffect, useState } from 'react';
import MeetupsCard from './MeetupsCard';
import {
  UserAvatar,
  hostmeetup,
  meetAvatar,
  meetAvatar2,
  meetupAvatar,
} from '../assets';
import ReactPaginate from 'react-paginate';

const MeetupList = ({ meetupTypes }) => {
  const [meetups, setMeetups] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/meetups`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await res.json();
        setMeetups(data);
      } catch (error) {
        setErrorMessage(
          'Oops! Something went wrong while fetching data. Please try again later',
        );
      }
    };

    fetchMeetups();
  }, []);

  const filteredMeetups = meetups.filter((meetup) =>
    meetupTypes.some((type) => meetup[type]),
  );

  const showProducts = 5;
  const paginateProducts = pageNumber * showProducts;

  const pageCount = Math.ceil(meetups?.length / showProducts);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      <ul className="flex flex-col gap-4 mt-10 ">
        {(meetupTypes.length === 0 ? meetups : filteredMeetups)
          ?.slice(paginateProducts, paginateProducts + showProducts)
          .map((data, id) => (
            <MeetupsCard
              key={id}
              title={data.name}
              location={data.location}
              content={data.content}
              image_url={data.image_url}
              date={data.date}
              fulltime={data.is_fulltime}
              parttime={data.is_parttime}
              internship={data.is_internship}
              remote={data.is_remote}
              contract={data.is_contract}
              free={data.is_free}
            />
          ))}
      </ul>
      {meetups?.length > 4 && (
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={changePage}
          className="flex items-center justify-center gap-4 mt-8 dark:text-white"
          containerClassName={`s.paginationBtns`}
          previousClassName={`border py-2 px-4 rounded-md dark:border-white border-black`}
          nextLinkClassName={`border py-2 px-4 rounded-md dark:border-white border-black`}
          disabledClassName={`hidden`}
          activeClassName={`border px-2 rounded-md border-pink-500`}
        />
      )}
    </div>
  );
};

export default MeetupList;
