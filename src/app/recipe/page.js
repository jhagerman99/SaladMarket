'use client'; // เพิ่มบรรทัดนี้

import React, { useEffect, useState } from 'react';

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe, index) => (
          <div key={index} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {recipe.name}
              </h5>
              <ul className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {recipe.ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient.amount}g {ingredient.ingredient} - {ingredient.calories} cal</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
