import Link from 'next/link';
import { CharacterDTO } from '../types/character';
import Image from 'next/image';

interface CharacterCardProps {
  character: CharacterDTO;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    return (
        <Link href={`/characters/${character.id}`} className="border bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition ease-in-out duration-150">
            <Image src={character.card_image} alt={character.name} className="w-full h-48 object-cover rounded-md" />
            <h2 className="mt-2 text-xl font-semibold">{character.name}</h2>
        </Link>
    );
}

export default CharacterCard;