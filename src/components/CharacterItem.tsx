import React, { useState } from 'react';
import { addFavorite, removeFavorite, isFavorite } from '../utils/favoriteCharacters';
import { CharacterDTO } from '../types/character';

interface CharacterItemProps {
  character: CharacterDTO;
}

const CharacterItem: React.FC<CharacterItemProps> = ({ character }) => {
  const [favorite, setFavorite] = useState<boolean>(isFavorite(character.id));

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
      <div>{character.name}</div>
      <button onClick={toggleFavorite} className={favorite ? 'text-yellow-400' : 'text-white'}>
        {favorite ? '★' : '☆'}
      </button>
    </div>
  );
}

export default CharacterItem;