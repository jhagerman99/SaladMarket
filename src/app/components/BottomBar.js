import React from 'react';
import '../globals.css';

export default function BottomBar({ totalAmount, totalCalories, onCreateRecipe }) {
  return (
    <div className="fixed ml-64 bottom-0 left-0 right-0 bg-white text-white p-5 grid grid-cols-5 shadow-top">
      <div className='col-span-4 bg-yellow-400 h-24 flex justify-between items-center m-5 rounded-lg'>
        <div className="text-3xl ml-5 font-semibold">
            {totalAmount} Your ingredients
        </div>
        <div className="text-3xl mr-5 font-semibold">
            {totalCalories} Cal
        </div>
      </div>
      <button 
        onClick={onCreateRecipe} 
        className="bg-customGreen text-white py-2 rounded-lg hover:bg-yellow-600 text-3xl font-semibold"
      >
        Create Recipe
      </button>
    </div>
  );
}
