import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Layout;