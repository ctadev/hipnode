import React, { ChangeEvent } from 'react';

interface InputProps {
  type: 'text' | 'email' | 'password';
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export default function Input({
  type,
  id,
  name,
  value,
  onChange,
  label,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
