import React from 'react';
import '../globals.css';

const  BottomBar = ({ totalAmount, totalCalories, onCreateRecipe }) => {
  return (
    <div className="fixed lg:ml-64 4xl:ml-80 bottom-0 left-0 right-0 bg-white text-white p-4 grid grid-cols-5 gap-5 shadow-top">
      <div className='ml-5 col-span-4 bg-customYellow h-14 4xl:h-20 flex justify-between items-center rounded-lg'>
        <div className="text-2xl ml-5 font-semibold">
            <span className='bg-white py-1 px-4 mr-2 rounded-lg text-customYellow'>{totalAmount}</span> Your ingredients
        </div>
        <div className="text-2xl mr-14 font-semibold">
            {totalCalories} Cal
        </div>
      </div>
      <button 
        onClick={onCreateRecipe} 
        className="mr-5 bg-customGreen text-white py-2 h-14 4xl:h-20 rounded-lg hover:bg-green-700 text-xl xl:text-2xl flex flex-col justify-center items-center font-semibold"
      >
        Create Recipe
      </button>
    </div>
  );
}

export default BottomBar;