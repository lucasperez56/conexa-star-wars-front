import axios from 'axios';
import NavBar from '../../components/NavBar';
import { GetServerSideProps } from 'next';
import DetailItem from '@/components/DetailItem';
import { FilmDTO } from '@/types/film';

interface FilmDetailProps {
  film: FilmDTO;
}

  export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params!.id as string;

    const res = await axios.get<FilmDTO>(`${process.env.BACKEND_URL}/films/${id}`);
    const film = res.data;

    return {
        props: {
          film
        }
    };
};

const FilmDetail: React.FC<FilmDetailProps> = ({ film }) => {
    return (
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <NavBar />
        <div className="mt-6 animate-fadeInFast">
          <h2 className="text-3xl mb-4 border-b pb-2 border-gray-700">{film.title}</h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <DetailItem label="Episode" value={film.episode_id} />
            <DetailItem label="Director" value={film.director} />
            <DetailItem label="Producer" value={film.producer} />
          </div>
        </div>
      </div>
    );
  };
  
  export default FilmDetail;