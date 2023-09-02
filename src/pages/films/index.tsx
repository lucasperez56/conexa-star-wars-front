import axios from 'axios';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import { GetServerSideProps, } from 'next/types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FilmDTO } from '@/types/film';
import SearchComponent from '@/components/SearchComponent';

interface FilmsPageProps {
    films: FilmDTO[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query.page ? Number(context.query.page) : 1;
    const search = context.query.search ? context.query.search : undefined;

    let url = `${process.env.BACKEND_URL}/films`;
    if (search) {
      url += `?search=${search}`;
    }
    const res = await axios.get<FilmDTO[]>(url);
    const films = res.data;

    return {
        props: {
            films
        }
    };
};

const FilmsPage: React.FC<FilmsPageProps> = ({ films }) => {
    const router = useRouter()

    const handleSearch = (term: string) => {
        router.push(`/films?search=${term}`);
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <NavBar />
            <h1 className="text-4xl mb-6 px-4">Films</h1>
            <SearchComponent onSearch={handleSearch} />
            <ul className="space-y-4">
                {films.map((film) => (
                    <li key={film.id} className="border-b border-gray-700 py-2">
                        <Link href={`/films/${film.id}`} className="text-xl hover:text-gray-400">
                            <span className="ml-4 text-sm text-gray-500">{film.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilmsPage;
