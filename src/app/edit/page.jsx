'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const fetchIngredients = async () => {
  try {
    const response = await fetch('/api/ingredients');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    return [];
  }
};

const findImagePath = (ingredientName, ingredients) => {
  const ingredient = ingredients.find(item => item.ingredient === ingredientName);
  return ingredient ? ingredient.image : '/images/defaultImage.jpg';
};

const EditRecipeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [recipe, setRecipe] = useState(null);
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    fetchIngredients().then(data => setIngredientsData(data));
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/recipes?id=${id}`);
          const data = await response.json();
          setRecipe(data);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const calculateTotalCalories = (ingredients) => {
    return ingredients.reduce((total, ingredient) => total + ingredient.calories * ingredient.quantity, 0);
  };

  const handleDeleteIngredient = (index) => {
    if (recipe && recipe.ingredients) {
      const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
      setRecipe({ ...recipe, ingredients: newIngredients });
    }
  };

  const updateRecipe = async () => {
    try {
      if (recipe) {
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          await fetch(`/api/recipes`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipe),
          });
          router.push('/recipe');
        } else {
          await fetch(`/api/recipes?id=${recipe.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          });
          router.push('/recipe');
        }
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredients = recipe.ingredients || [];

  return (
    <div className='m-4 mt-10 h-screen'>
      <h1 className="text-3xl font-bold mb-10">Edit Recipe</h1>

      <div className="bg-white rounded-lg p-5">
        <h4 className='text-2xl font-bold'>Your ingredients to make a {recipe.name} Recipe:</h4>
        <div className='my-5 pb-7 border-b border-gray-300'>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <div key={index}>
                <div className='py-2 bg-white flex justify-between'>
                  <div className='flex'>
                    <img src={findImagePath(ingredient.ingredient, ingredientsData)} className='w-20 h-20' alt={ingredient.ingredient} />
                    <div className='ml-5 flex flex-col justify-center'>
                      <h5 className="text-xl font-semibold text-black">{ingredient.ingredient}</h5>
                      <div>
                        <span className='text-gray-500'>x{ingredient.quantity}</span>
                        <button className='text-base ml-5 underline text-rose-500 font-semibold' onClick={() => handleDeleteIngredient(index)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                    <div className="font-semibold text-lg text-gray-700 dark:text-gray-400">
                      +{ingredient.calories * ingredient.quantity} <span className='text-customYellow'>Cal</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No ingredients available.</p>
          )}
        </div>

        <div className='mt-10 flex justify-between text-lg font-semibold'>
          <div>Total Calorie</div>
          <div className='text-2xl'>{calculateTotalCalories(ingredients)} <span className='text-customYellow'>Cal</span></div>
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
};

export default function EditRecipe() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditRecipeContent />
    </Suspense>
  );
}
