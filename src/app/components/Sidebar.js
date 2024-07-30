'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname  } from 'next/navigation';

const Sidebar = () => {
  const currentPath = usePathname();

  return (
    <div className="mt-10 w-80 bg-white text-center">
      <div className="p-4">
        <h2 className="text-3xl font-bold mb-14 text-customBlue">
          SALADMAKER<span className='text-customYellow'>.</span>
          </h2>
        <ul>
          <li className={`m-5 p-4 w-52 rounded-lg ${
              currentPath === '/' ? 'bg-yellow-500 text-white' : 'text-gray-400'
            }`}>
            <Link href="/">
              Salad maker
            </Link>
          </li>
          <li className={`m-5 p-4 w-52 rounded-lg ${
              currentPath === '/recipe' ? 'bg-yellow-500 text-white' : 'text-gray-400'
            }`}
            >
            <Link href="/recipe">
              Recipe
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;