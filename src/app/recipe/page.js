'use client'; // เพิ่มบรรทัดนี้

import React, { useEffect, useState } from 'react';

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  
  const calculateTotalCalories = (ingredients) => {
    return ingredients.reduce((total, ingredient) => {
      return total + (ingredient.calories);
    }, 0);
  };

  useEffect(() => {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div className='m-4 mt-10 h-screen'>
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-10 bg-white rounded-lg">
        {recipes.map((recipe, index) => (

          <div key={index} className="w-80 h-80 background-image rounded-xl dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
              <div className='m-5 p-3 py-6 rounded-xl bg-white'>
                <h5 className="mb-2 text-lg text-black">
                  {recipe.name}
                </h5>
                <div className="font-bold text-2xl text-gray-700 dark:text-gray-400">
                  {calculateTotalCalories(recipe.ingredients)} <span className='text-customYellow'>Cal</span>
                </div>
            </div>
              <div className='text-center mb-5'>
                <button className='w-36 p-2 mr-2 bg-white rounded-3xl text-rose-500 font-bold'>
                  Delete
                </button>
                <button className='w-36 p-2 bg-white rounded-3xl text-black font-bold'>Edit</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
