import React from 'react';

export default function Card({ image, name, calories }) {
  return (
    <div className="w-96 h-80 relative p-7 flex flex-col">
      <img className="w-full h-48 object-cover rounded-lg" src={image} alt={name} />
      <div className="pt-5 flex-grow">
        <h5 className="mb-2 text-xl font-normal tracking-tight" style={{ color: '#2E2E2E' }}>
          {name}
        </h5>
        <p className="font-normal">
          <span className="font-bold text-2xl" style={{ color: '#2E2E2E' }}>{calories}</span>
          <span className="font-bold" style={{ fontSize: '28px', color: '#F8B602' }}> Cal</span>
        </p>
      </div>
      <div className="flex justify-end mt-auto">
        <button
          className="inline-flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
}
