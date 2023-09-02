import axios from 'axios';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import { CharacterDTO } from '@/types/character';
import { GetServerSideProps, } from 'next/types';
import { useState } from 'react';
import CharacterCard from '@/components/CharacterCard';
import { useRouter } from 'next/router';

interface CharactersPageProps {
    characters: CharacterDTO[];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = context.query.page ? Number(context.query.page) : 1;

    const res = await axios.get<CharacterDTO[]>(`http://localhost:8080/characters?page=${page}`);
    const characters = res.data;

    return {
        props: {
            characters
        }
    };
};

const CharactersPage: React.FC<CharactersPageProps> = ({ characters }) => {
    const router = useRouter();
    const [page, setPage] = useState<number>(Number(router.query.page) || 1);

    const handlePrevious = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            router.push(`/characters?page=${newPage}`);
        }
    };

    const handleNext = () => {
        const newPage = page + 1;
        setPage(newPage);
        router.push(`/characters?page=${newPage}`);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <NavBar />
            <h1 className="text-4xl mb-6 px-4">Characters</h1>
            <ul className="space-y-4">
                {characters.map((character) => (
                    <li key={character.id} className="border-b border-gray-700 py-2">
                        <Link href={`/characters/${character.id}`} className="text-xl hover:text-gray-400">
                        <span className="ml-4 text-sm text-gray-500">{character.name}</span>
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

export default CharactersPage;
