import React from 'react';
import { IGroup } from '../../../types/index';
import { formattedDate } from '../../helpers/date';

interface GroupCardProps {
  group: IGroup;
}

export default function GroupCard({ group }: GroupCardProps) {
  const { name, description, logo_url, image_url, created_at } = group;
  return (
    <article>
      <div>
        <img src={logo_url} alt={name} height={25} width={25} />
        <h3>{name}</h3>
      </div>
      <div>
        <img src={image_url} alt={name} height={100} width={100} />
      </div>
      <p>{description}</p>
      <span>{formattedDate(created_at)}</span>
    </article>
  );
}
