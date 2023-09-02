import axios from 'axios';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import { GetServerSideProps, } from 'next/types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { PlanetDTO } from '@/types/planet';

interface PlanetsPageProps {
    planets: PlanetDTO[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query.page ? Number(context.query.page) : 1;
    const search = context.query.search ? context.query.search : undefined;

    let url = `${process.env.BACKEND_URL}/planets`;
    if (search) {
        url += `?search=${search}`;
    } else if (page) {
        url += `?page=${page}`;
    }

    const res = await axios.get<PlanetDTO[]>(url);
    const planets = res.data;

    return {
        props: {
            planets
        }
    };
};

const PlanetsPage: React.FC<PlanetsPageProps> = ({ planets }) => {
    const router = useRouter();
    const [page, setPage] = useState<number>(Number(router.query.page) || 1);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = () => {
        router.push(`/planets?search=${searchTerm}`);
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

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <NavBar />
            <h1 className="text-4xl mb-6 px-4">Planets</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 bg-gray-800 rounded"
                />
                <button onClick={handleSearch} className="p-2 bg-gray-700 hover:bg-gray-600 rounded ml-2">
                    Search
                </button>
            </div>
            <ul className="space-y-4">
                {planets.map(planet => (
                    <li key={planet.id} className="border-b border-gray-700 py-2">
                    <Link href={`/planets/${planet.id}`} className="text-xl hover:text-gray-400">
                        <span className="ml-4 text-sm text-gray-500">{planet.name}</span>
                    </Link>
                </li>
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
