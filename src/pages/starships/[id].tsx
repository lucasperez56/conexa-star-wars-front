import axios from 'axios';
import NavBar from '../../components/NavBar';
import { StarshipDTO } from '../../types/starship';
import { GetServerSideProps } from 'next';
import DetailItem from '@/components/DetailItem';

interface StarshipDetailProps {
  starship: StarshipDTO;
}

  export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params!.id as string;

    const res = await axios.get<StarshipDTO>(`${process.env.BACKEND_URL}/starships/${id}`);
    const starship = res.data;

    return {
        props: {
            starship
        }
    };
};

const StarshipDetail: React.FC<StarshipDetailProps> = ({ starship }) => {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <NavBar />
        <div className="mt-6 animate-fadeInFast">
          <h2 className="text-3xl mb-4 border-b pb-2 border-gray-700">{starship.name}</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <DetailItem label="Model" value={starship.model} />
            <DetailItem label="Starship Class" value={starship.starship_class} />
            <DetailItem label="Manufacturer" value={starship.manufacturer} />
            <DetailItem label="Cost in Credits" value={starship.cost_in_credits} />
          </div>
        </div>
      </div>
    );
  };
  
  export default StarshipDetail;