import React, { ReactNode } from 'react';
import NavBar from '@/components/NavBar';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <header>
        <NavBar />
      </header>
      <main >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;