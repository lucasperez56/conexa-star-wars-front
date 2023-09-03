import axios from 'axios';
import NavBar from '../../components/NavBar';
import { StarshipDTO } from '../../types/starship';
import DetailItem from '@/components/DetailItem';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import DetailSkeleton from '@/components/DetailSkeleton';

const fetcher = (url: string) => axios.get<StarshipDTO>(url).then(res => res.data);

const StarshipDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: starship, isLoading, error } = useSWR<StarshipDTO>(id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/starships/${id}` : null, fetcher);

  if (error) return <div className="text-white">Failed to load starship</div>;
  if (isLoading) return (
    <div>
      <div className="mt-6 animate-fadeInFast">
        <div className="text-3xl mb-4 border-b pb-2 border-gray-700"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <DetailSkeleton />
          <DetailSkeleton />
        </div>
      </div>
    </div>
  )
    return (
      <div>
        <div className="mt-6 animate-fadeInFast">
        {starship && (
          <>
            <h2 className="text-3xl mb-4 border-b pb-2 border-gray-700">{starship.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <DetailItem label="Model" value={starship.model} />
              <DetailItem label="Starship Class" value={starship.starship_class} />
              <DetailItem label="Manufacturer" value={starship.manufacturer} />
              <DetailItem label="Cost in Credits" value={starship.cost_in_credits} />
            </div>
          </>
          )}
        </div>
      </div>
    );
  };
  
  export default StarshipDetail;