import Link from 'next/link';
import { useState } from 'react';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-gray-900 text-white px-4 py-3">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Star Wars</h1>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {/* Icono de menú */}
                    ☰
                </button>
            </div>

            {/* Menu */}
            <div className={`mt-3 ${isOpen ? 'block' : 'hidden'} md:block`}>
                <nav className="grid grid-cols-1 md:hidden gap-6 mt-4">
                    <Link href="/characters" className="hover:text-gray-400">Characters 👨‍👩‍👧‍👧</Link>
                    <Link href="/films" className="hover:text-gray-400">Films 📹</Link>
                    <Link href="/starships" className="hover:text-gray-400">Starships 🚀</Link>
                    <Link href="/planets" className="hover:text-gray-400">Planets 🪐</Link>
                </nav>
                <nav className="hidden md:space-x-4 md:block">
                    <Link href="/characters" className="hover:text-gray-400">Characters 👨‍👩‍👧‍👧</Link>
                    <Link href="/films" className="hover:text-gray-400">Films 📹</Link>
                    <Link href="/starships" className="hover:text-gray-400">Starships 🚀</Link>
                    <Link href="/planets" className="hover:text-gray-400">Planets 🪐</Link>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;