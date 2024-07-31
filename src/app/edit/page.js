'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EditRecipe() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');  // Getting the query parameter
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/recipes?id=${id}`)
        .then(response => response.json())
        .then(data => setRecipe(data));
    }
  }, [id]);

  const calculateTotalCalories = (ingredients) => {
    return ingredients.reduce((total, ingredient) => {
      return total + ingredient.calories * ingredient.quantity;
    }, 0);
  };

  const handleDeleteIngredient = (index) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const updateRecipe = () => {
    if(recipe.ingredients.length>0){
      fetch(`/api/recipes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: recipe.id, updatedRecipe: recipe }),
      })
      .then(response => response.json())
      .then(data => {
        router.push('/recipe');  // Navigate back to the recipes list
      });
    } else {
      fetch('/api/recipes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: recipe.id }),
      })
      .then(response => response.json())
      .then(data => {
        router.push('/recipe');  // Navigate back to the recipes list
      });
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className='m-4 mt-10 h-screen'>
      <h1 className="text-3xl font-bold mb-10">Edit Recipe</h1>

      <div className="bg-white rounded-lg p-5">
        <h4 className='text-2xl font-bold'>Your ingredients to make a {recipe.name} Recipe: </h4>
        <div className='my-5 pb-7 border-b border-gray-300'>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <div className='py-2 bg-white flex justify-between'>
                <div className='flex'>
                    <img src={ingredient.image} className='w-20 h-20'/>
                    <div className='ml-5 flex flex-col justify-center '>
                        <h5 className="text-xl font-semibold text-black ">{ingredient.ingredient}</h5>
                        <div>
                            <span className='text-gray-500'>x{ingredient.quantity}</span>
                            <button className='text-base ml-5 underline text-rose-500 font-semibold' onClick={() => handleDeleteIngredient(index)}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div className="font-semibold text-lg text-gray-700 dark:text-gray-400">
                    +{(ingredient.calories)} <span className='text-customYellow'>Cal</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-10 flex justify-between text-lg font-semibold'>
            <div>Total Calorie</div>
            <div className='text-2xl'>{calculateTotalCalories(recipe.ingredients)} <span className='text-customYellow'>Cal</span> </div>
        </div>

        <div className='text-center mt-5'>
          <button
            className='w-full p-2 bg-customYellow text-white rounded-xl font-bold'
            onClick={updateRecipe}
          >
            Update Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
