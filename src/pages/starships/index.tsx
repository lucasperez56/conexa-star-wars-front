import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { StarshipDTO } from '@/types/starship';
import useSWR from 'swr';
import SearchComponent from '@/components/SearchComponent';
import IndexSkeleton from '@/components/IndexSkeleton';
import IndexItem from '@/components/IndexItem';

const fetcher = (url: string) => axios.get<StarshipDTO[]>(url).then(res => res.data);

const StarshipsPage: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState<number>(Number(router.query.page) || 1);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const url = searchTerm
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/starships?search=${searchTerm}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/starships?page=${page}`;

    const { data: starships, isLoading } = useSWR<StarshipDTO[]>(url, fetcher);

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        router.push(`/starships?search=${searchTerm}`);
    }

    const handlePrevious = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            router.push(`/starships?page=${newPage}`);
        }
    };

    const handleNext = () => {
        const newPage = page + 1;
        setPage(newPage);
        router.push(`/starships?page=${newPage}`);
    };

    if (isLoading) {
        return (
            <div>
                <h1 className="text-4xl mb-6 px-4">Starships</h1>
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
            <h1 className="text-4xl mb-6 px-4">Starships</h1>
            <div className="mb-6">
                <SearchComponent onSearch={handleSearch} />
            </div>
            <ul className="space-y-4">
                {starships && starships.map(starship => (
                    <IndexItem key={starship.id} entity={starship} link='starships' />
                ))}
            </ul>
            <div className="mt-4 flex justify-center">
                <button
                    onClick={handlePrevious}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md mx-1"
                    disabled={page <= 1}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md mx-1"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StarshipsPage;
