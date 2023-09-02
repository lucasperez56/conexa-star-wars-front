import axios from 'axios';
import NavBar from '../../components/NavBar';
import { CharacterDTO } from '../../types/character';
import { GetServerSideProps } from 'next';

interface CharacterDetailProps {
  character: CharacterDTO;
}

  export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params!.id as string;
    const res = await axios.get<CharacterDTO>(`http://localhost:8080/characters/${id}`);
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
        <h1 className="text-4xl mb-6">{character.name}</h1>
        {/* Añade aquí más detalles como imagen, descripción, etc. */}
      </div>
    );
};

export default CharacterDetail;