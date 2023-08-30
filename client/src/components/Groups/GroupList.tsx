import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import GroupCard from './GroupCard';

export default function GroupList() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:8000/groups');
        return res.data;
      } catch (err: any) {
        if (err && typeof err === 'object' && 'response' in err) {
          throw new Error(err.response?.data.message);
        }
      }
    },
  });

  return (
    <section>
      {data.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </section>
  );
}
