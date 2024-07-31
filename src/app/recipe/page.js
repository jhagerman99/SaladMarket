'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DeleteModal from '../components/DeleteModal';

export default function Recipe() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const calculateTotalCalories = (ingredients) => {
    return ingredients.reduce((total, ingredient) => {
      return total + ingredient.calories*ingredient.quantity;
    }, 0);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    fetch('/api/recipes', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: recipeToDelete.id }),
    })
      .then(response => response.json())
      .then(() => {
        setRecipes(recipes.filter(r => r.id !== recipeToDelete.id));
        setShowModal(false);
        setRecipeToDelete(null);
      });
  };

  const handleEditClick = (id) => {
    router.push(`/edit?id=${id}`);
  };

  return (
    <div className='m-4 mt-10 h-screen'>
      <h1 className="text-3xl font-bold mb-10">Recipes</h1>

      <div className="bg-white rounded-lg p-5">
        <h4 className='mb-5 text-lg font-bold'>Your recipe</h4>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-10'>
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
                <button
                  className='w-36 p-2 mr-2 bg-white rounded-3xl text-rose-500 font-bold'
                  onClick={() => handleDeleteClick(recipe)}
                >
                  Delete
                </button>
                <button
                  className='w-36 p-2 bg-white rounded-3xl text-black font-bold'
                  onClick={() => handleEditClick(recipe.id)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        recipeName={recipeToDelete?.name}
      />
    </div>
  );
}
