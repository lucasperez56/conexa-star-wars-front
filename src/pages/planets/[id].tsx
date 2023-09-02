import axios from 'axios';
import NavBar from '../../components/NavBar';
import { PlanetDTO } from '../../types/planet';
import { GetServerSideProps } from 'next';
import DetailItem from '@/components/DetailItem';

interface PlanetDetailProps {
  planet: PlanetDTO;
}

  export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params!.id as string;

    const res = await axios.get<PlanetDTO>(`${process.env.BACKEND_URL}/planets/${id}`);
    const planet = res.data;

    return {
        props: {
            planet
        }
    };
};

const PlanetDetail: React.FC<PlanetDetailProps> = ({ planet }) => {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <NavBar />
        <div className="mt-6 animate-fadeInFast">
          <h2 className="text-3xl mb-4 border-b pb-2 border-gray-700">{planet.name}</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <DetailItem label="Population" value={planet.population} />
            <DetailItem label="Terrain" value={planet.terrain} />
          </div>
        </div>
      </div>
    );
  };
  
  export default PlanetDetail;