import axios from 'axios';
import NavBar from '../../components/NavBar';
import { PlanetDTO } from '../../types/planet';
import { GetServerSideProps } from 'next';
import DetailItem from '@/components/DetailItem';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import DetailSkeleton from '@/components/DetailSkeleton';

const fetcher = (url: string) => axios.get<PlanetDTO>(url).then(res => res.data);

const PlanetDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: planet, isLoading, error } = useSWR<PlanetDTO>(id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/planets/${id}` : null, fetcher);

  if (error) return <div className="text-white">Failed to load planet</div>;
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
        {planet && (
          <>
            <h2 className="text-3xl mb-4 border-b pb-2 border-gray-700">{planet.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <DetailItem label="Population" value={planet.population} />
              <DetailItem label="Terrain" value={planet.terrain} />
            </div>
          </>
          )}
      </div>
    </div>
  );
};

export default PlanetDetail;