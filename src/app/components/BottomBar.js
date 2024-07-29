import React from 'react';

export default function BottomBar({ totalAmount, totalCalories, onCreateRecipe }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-between items-center">
      <div>
        <span className="font-bold text-xl">{totalAmount} Your ingredients</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="font-bold text-xl">{totalCalories} Cal</span>
        <button 
          onClick={onCreateRecipe} 
          className="inline-flex items-center justify-center px-4 py-2 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
        >
          Create Recipe
        </button>
      </div>
    </div>
  );
}
