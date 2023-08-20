import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import GroupCard from '../../GroupCard';

const fetchGroupsByUser = async (userId: number) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${userId}/groups`,
    );
    if (res.status !== 200) {
      throw new Error('Failed to fetch groups');
    }

    return res.data;
  } catch (err) {
    console.error(err.message);
  }
};

const InterviewsFilter = () => {
  const { profileId } = useParams();

  const {
    isLoading,
    isError,
    data: groups,
    error,
  } = useQuery({
    queryKey: ['groups', profileId],
    queryFn: () => fetchGroupsByUser(Number(profileId)),
  });

  if (isLoading) {
    return <h1>Loading!</h1>;
  }

  if (isError && error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="columns-1 sm:columns-2 xl:columns-3 2xl:columns-4 gap-4">
      {groups?.map((group) => (
        <GroupCard group={group} key={group.id} />
      ))}
    </div>
  );
};

export default InterviewsFilter;
