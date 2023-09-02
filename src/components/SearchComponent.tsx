
import React, { useState } from 'react';

interface SearchComponentProps {
    onSearch?: (term: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = (props) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearch = () => {
        if(props.onSearch) {
            props.onSearch(searchTerm);
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 bg-gray-800 rounded"
            />
            <button 
                onClick={handleSearch} 
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded ml-2"
            >
                Search
            </button>
        </div>
    );
}

export default SearchComponent;