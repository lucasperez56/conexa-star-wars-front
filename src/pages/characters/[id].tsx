import axios from 'axios';
import NavBar from '../../components/NavBar';
import { CharacterDTO } from '../../types/character';
import { GetServerSideProps } from 'next';
import DetailItem from '@/components/DetailItem';

interface CharacterDetailProps {
  character: CharacterDTO;
}

  export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params!.id as string;

    const res = await axios.get<CharacterDTO>(`${process.env.BACKEND_URL}/characters/${id}`);
    const character = res.data;

    return {
        props: {
            character
        }
    };
};

const CharacterDetail: React.FC<CharacterDetailProps> = ({ character }) => {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <NavBar />
        <div className="mt-6 animate-fadeInFast">
          <h2 className="text-3xl mb-4 border-b pb-2 border-gray-700">{character.name}</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <DetailItem label="Birth Year" value={character.birth_year} />
            <DetailItem label="Eye Color" value={character.eye_color} />
            <DetailItem label="Gender" value={character.gender} />
            <DetailItem label="Hair Color" value={character.hair_color} />
            <DetailItem label="Height" value={character.height} />
            <DetailItem label="Mass" value={character.mass} />
            <DetailItem label="Skin Color" value={character.skin_color} />
          </div>
        </div>
      </div>
    );
  };
  
  export default CharacterDetail;