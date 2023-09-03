import React from 'react';
import { CharacterDTO } from '../types/character';
import Link from 'next/link';
import { StarshipDTO } from '@/types/starship';
import { PlanetDTO } from '@/types/planet';
import { FilmDTO } from '@/types/film';

interface IndexItemProps {
  link: string;
  entity: FilmDTO | StarshipDTO | PlanetDTO;
}

const IndexItem: React.FC<IndexItemProps> = ({ link, entity }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-2">
      <Link href={`/${link}/${entity.id}`} className="hover:text-gray-400">
        <div>{entity.name}</div>
      </Link>
    </div>
  );
}

export default IndexItem;