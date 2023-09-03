import axios from 'axios';
import NavBar from '../../components/NavBar';
import { CharacterDTO } from '../../types/character';
import { GetServerSideProps } from 'next';
import DetailItem from '@/components/DetailItem';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import DetailSkeleton from '@/components/DetailSkeleton';

interface CharacterDetailProps {
  character: CharacterDTO;
}

const fetcher = (url: string) => axios.get<CharacterDTO>(url).then(res => res.data);

const CharacterDetail: React.FC<CharacterDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: character, error } = useSWR<CharacterDTO>(id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/characters/${id}` : null, fetcher);

  if (error) return <div className="text-white">Failed to load character</div>;
  if (!character) return (
    <div>
      <div className="mt-6 animate-fadeInFast">
          <div className="text-3xl mb-4 border-b pb-2 border-gray-700"></div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <DetailSkeleton />
            <DetailSkeleton />
            <DetailSkeleton />
            <DetailSkeleton />
            <DetailSkeleton />
            <DetailSkeleton />
            <DetailSkeleton />
          </div>
        </div>
    </div>
  )

    return (
      <div>
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