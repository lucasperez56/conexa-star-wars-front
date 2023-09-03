import React, { useEffect, useState } from 'react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favoriteCharacters';
import { CharacterDTO } from '../types/character';
import Link from 'next/link';

interface CharacterItemProps {
  character: CharacterDTO;
}

const FavoriteItem: React.FC<CharacterItemProps> = ({ character }) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  useEffect(() => {
    character && setFavorite(isFavorite(character.id))
  }, [character])

  const toggleFavorite = (): void => {
    if (favorite) {
      removeFavorite(character.id);
      setFavorite(false);
    } else {
      addFavorite(character.id);
      setFavorite(true);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-2">
      <Link href={`/characters/${character.id}`} className="hover:text-gray-400">
        <div>{character.name}</div>
      </Link>
      <button onClick={toggleFavorite} className={favorite ? 'text-yellow-400' : 'text-white'}>
        {favorite ? '★' : '☆'}
      </button>
    </div>
  );
}

export default FavoriteItem;