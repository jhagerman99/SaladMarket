import React from 'react';
import '../globals.css';

const  BottomBar = ({ totalAmount, totalCalories, onCreateRecipe }) => {
  return (
    <div className="fixed ml-80 bottom-0 left-0 right-0 bg-white text-white p-5 grid grid-cols-5 gap-5 shadow-top">
      <div className='col-span-4 bg-yellow-400 h-20 flex justify-between items-center rounded-lg'>
        <div className="text-2xl ml-5 font-semibold">
            <span className='bg-white p-2 px-4 rounded-lg text-yellow-400'>{totalAmount}</span> Your ingredients
        </div>
        <div className="text-2xl mr-14 font-semibold">
            {totalCalories} Cal
        </div>
      </div>
      <button 
        onClick={onCreateRecipe} 
        className="bg-customGreen text-white py-2 h-20 rounded-lg hover:bg-green-700 text-2xl font-semibold"
      >
        Create Recipe
      </button>
    </div>
  );
}

export default BottomBar;