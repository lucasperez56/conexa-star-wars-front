import axios from 'axios';
import NavBar from '../../components/NavBar';
import { GetServerSideProps } from 'next';
import DetailItem from '@/components/DetailItem';
import { FilmDTO } from '@/types/film';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import DetailSkeleton from '@/components/DetailSkeleton';

interface FilmDetailProps {
  film: FilmDTO;
}

const fetcher = (url: string) => axios.get<FilmDTO>(url).then(res => res.data);

const FilmDetail: React.FC<FilmDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: film, isLoading, error } = useSWR<FilmDTO>(id ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/films/${id}` : null, fetcher);

  if (error) return <div className="text-white">Failed to load film</div>;
  if (isLoading) return (
    <div>
      <div className="mt-6 animate-fadeInFast">
          <div className="text-3xl mb-4 border-b pb-2 border-gray-700"></div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
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
        {film && (
            <>
            <h2 className="text-3xl mb-4 border-b pb-2 border-gray-700">{film.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <DetailItem label="Episode" value={film.episode_id} />
              <DetailItem label="Director" value={film.director} />
              <DetailItem label="Producer" value={film.producer} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilmDetail;