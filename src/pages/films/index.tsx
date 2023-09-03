import axios from 'axios';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import { GetServerSideProps, } from 'next/types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FilmDTO } from '@/types/film';
import SearchComponent from '@/components/SearchComponent';
import useSWR from 'swr';
import IndexSkeleton from '@/components/IndexSkeleton';
import IndexItem from '@/components/IndexItem';

const fetcher = (url: string) => axios.get<FilmDTO[]>(url).then(res => res.data);

const FilmsPage: React.FC = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/films`;
    if (searchTerm) {
        url += `?search=${searchTerm}`;
      }

    const { data: films, isLoading } = useSWR<FilmDTO[]>(url, fetcher);

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        router.push(`/films?search=${term}`);
    }

    if (isLoading) {
        return (
            <div>
                <h1 className="text-4xl mb-6 px-4">Films</h1>
                <div className="mb-6">
                    <SearchComponent onSearch={handleSearch} />
                    <ul className="space-y-4 mt-4">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <IndexSkeleton key={index} />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl mb-6 px-4">Films</h1>
            <SearchComponent onSearch={handleSearch} />
            <ul className="space-y-4">
                {films && films.map((film) => (
                    <IndexItem key={film.id} entity={film} link='films' />
                ))}
            </ul>
        </div>
    );
};

export default FilmsPage;
