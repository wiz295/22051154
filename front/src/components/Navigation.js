import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Social Media Analytics</Link>
        <div className="flex space-x-4">
          <Link 
            to="/" 
            className={`hover:text-blue-200 ${location.pathname === '/' ? 'font-bold border-b-2 border-white' : ''}`}
          >
            Top Users
          </Link>
          <Link 
            to="/trending" 
            className={`hover:text-blue-200 ${location.pathname === '/trending' ? 'font-bold border-b-2 border-white' : ''}`}
          >
            Trending Posts
          </Link>
          <Link 
            to="/feed" 
            className={`hover:text-blue-200 ${location.pathname === '/feed' ? 'font-bold border-b-2 border-white' : ''}`}
          >
            Feed
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;