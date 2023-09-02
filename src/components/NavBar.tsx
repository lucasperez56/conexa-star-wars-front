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
                <nav className="space-x-4">
                    <Link href="/characters" className="hover:text-gray-400">Characters 👨‍👩‍👧‍👧</Link>
                    <Link href="/movies" className="hover:text-gray-400">Movies 📹</Link>
                    <Link href="/ships" className="hover:text-gray-400">Ships 🚀</Link>
                    <Link href="/planets" className="hover:text-gray-400">Planets 🪐</Link>
                </nav>
            </div>
        </div>
    );
}

export default NavBar;