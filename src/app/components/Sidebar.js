import React from 'react';
import Link from 'next/link'; // เพิ่มการนำเข้า Link จาก next/link

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul>
          <li className="mb-2">
            <Link href="/">
              Ingredients
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/recipe">
              Recipes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
