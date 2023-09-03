import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { PlanetDTO } from '@/types/planet';
import SearchComponent from '@/components/SearchComponent';
import useSWR from 'swr';
import IndexSkeleton from '@/components/IndexSkeleton';
import IndexItem from '@/components/IndexItem';

const fetcher = (url: string) => axios.get<PlanetDTO[]>(url).then(res => res.data);

const PlanetsPage: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState<number>(Number(router.query.page) || 1);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const url = searchTerm
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/planets?search=${searchTerm}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/planets?page=${page}`;

    const { data: planets, isLoading } = useSWR<PlanetDTO[]>(url, fetcher);

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        router.push(`/planets?search=${term}`);
    }

    const handlePrevious = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            router.push(`/planets?page=${newPage}`);
        }
    };

    const handleNext = () => {
        const newPage = page + 1;
        setPage(newPage);
        router.push(`/planets?page=${newPage}`);
    };

    if (isLoading) {
        return (
            <div>
                <h1 className="text-4xl mb-6 px-4">Planets</h1>
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
            <h1 className="text-4xl mb-6 px-4">Planets</h1>
            <div className="mb-6">
                <SearchComponent onSearch={handleSearch} />
            </div>
            <ul className="space-y-4">
                {planets && planets.map(planet => (
                    <IndexItem key={planet.id} entity={planet} link='planets' />
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

export default PlanetsPage;
