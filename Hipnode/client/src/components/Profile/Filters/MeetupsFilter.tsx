import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';

import { MeetupsFilterCard } from './';
import { MeetupsCard } from '../..';
import { User } from '../../../../types';
import { useGetUsers } from '../../../../hooks/useUsers';

const getPostsByUserId = async (profileId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${profileId}/meetups`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user') ?? '').token
        }`,
      },
    },
  );
  return res.data;
};

const MeetupsFilter = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const { data, isLoading, isError } = useQuery('meetups', () =>
    getPostsByUserId(profileId),
  );
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = useGetUsers();

  useEffect(() => {
    const sortUsers = () => {
      getUsers.mutateAsync().then((result) => {
        setUsers(result);
      });
    };
    sortUsers();
  }, []);

  return (
    <div className="flex flex-col gap-5 lg:w-full mt-6">
      <div className="dark:bg-dark-black-1 rounded-lg lg:mt-0">
        <div className="flex flex-col gap-[20px]">
          {data?.map((data, index) => (
            <MeetupsCard
              key={data.id}
              podcastId={data.id}
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
              editType="meetups"
              meetupId={parseInt(data.id)}
            />
            // <MeetupsFilterCard
            // 	key={index}
            // 	meetup={data}
            // 	user={users.find((user) => user?.id === data?.user_id)}
            // 	editType="meetups"
            // />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetupsFilter;
