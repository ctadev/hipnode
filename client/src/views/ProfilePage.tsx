import React, { useState } from 'react';
import CategoryButtons from '../components/Profile/CategoryButtons';
import CategoryComponentMap from '../components/Profile/CategoryComponentMap';

export type CategoryState = 'posts' | 'meetups' | 'groups' | 'podcasts';

export default function ProfilePage() {
  const [category, setCategory] = useState<CategoryState>('posts');

  return (
    <main>
      <CategoryButtons setCategory={setCategory} />
      <CategoryComponentMap category={category} />
    </main>
  );
}
