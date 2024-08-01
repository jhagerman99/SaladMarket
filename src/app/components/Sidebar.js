'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 bg-yellow-500 p-2 rounded-full text-white" 
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div 
        className={`pt-10 fixed h-full w-64 2xl:w-80 bg-white text-center transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-14 text-customBlue">
            SALADMAKER<span className='text-customYellow'>.</span>
          </h2>
          <ul>
            <li className={`p-4 w-52 rounded-lg ${
              currentPath === '/' ? 'bgYellow text-white' : 'text-gray-400'
            }`}>
              <Link href="/">Salad maker</Link>
            </li>
            <li className={`p-4 w-52 rounded-lg ${
              currentPath === '/recipe' ? 'bgYellow text-white' : 'text-gray-400'
            }`}>
              <Link href="/recipe">Recipe</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
