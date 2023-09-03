import axios from 'axios';
import { CharacterDTO } from '@/types/character';
import { useState } from 'react';
import { useRouter } from 'next/router';
import CharacterItem from '../../components/FavoriteItem';
import { getFavorites } from '../../utils/favoriteCharacters';
import useSWR from 'swr';
import SearchComponent from '@/components/SearchComponent';
import IndexSkeleton from '@/components/IndexSkeleton';
import FavoriteItem from '../../components/FavoriteItem';

const fetcher = (url: string) => axios.get<CharacterDTO[]>(url).then(res => res.data);


const CharactersPage: React.FC = () => {
    const router = useRouter();
    const [page, setPage] = useState<number>(Number(router.query.page) || 1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false);

    const url = searchTerm
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/characters?search=${searchTerm}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/characters?page=${page}`;

    const { data: characters, error } = useSWR<CharacterDTO[]>(url, fetcher);

    // TODO: Los favoritos se marcan sin prestar atención al paginado, y quedan como favoritos a la pagina
    const filteredCharacters = showOnlyFavorites
        ? characters?.filter(char => getFavorites().includes(char.id))
        : characters;

    const handleSearch = (term: string) => {
        setSearchTerm(term)
        router.push(`/characters?search=${term}`);
    }

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

    if (!characters) {
        return (
            <div>
                <h1 className="text-4xl mb-6 px-4">Characters</h1>
                <button
                    className="mb-4 p-2 bg-gray-700 hover:bg-gray-600 rounded"
                    onClick={() => setShowOnlyFavorites(prev => !prev)}
                >
                    {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
                </button>
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
            <h1 className="text-4xl mb-6 px-4">Characters</h1>
            <button
                className="mb-4 p-2 bg-gray-700 hover:bg-gray-600 rounded"
                onClick={() => setShowOnlyFavorites(prev => !prev)}
            >
                {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
            </button>
            <div className="mb-6">
                <SearchComponent onSearch={handleSearch} />
            </div>
            <ul className="space-y-4">
                {filteredCharacters && filteredCharacters.map(character => (
                    <FavoriteItem key={character.id} character={character} />
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
