import React from 'react';

export default function Error({ error }) {
  return <div>Error occured: {error?.message}</div>;
}
