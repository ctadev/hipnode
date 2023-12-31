import { useQuery } from '@tanstack/react-query';
import React from 'react';
import GroupCard from './GroupCard';
import { getAllGroups } from '../../services/apiService/groupApi';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import { IGroup } from '../../../types/index';

export default function GroupList() {
  const {
    data: groups,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error && isError) {
    return <Error error={error} />;
  }

  return (
    <section className="columns-1 sm:columns-2 xl:columns-3 gap-4 w-full">
      {groups?.map((group: IGroup) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </section>
  );
}
