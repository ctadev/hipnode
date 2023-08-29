import React from 'react';

interface InputErrorProps {
  error: string;
}

export default function InputError({ error }: InputErrorProps) {
  return <p>{error}</p>;
}
