'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DeleteModal from '../components/DeleteModal';
import Image from 'next/image';
import deleteIcon from '../../../public/icon/mi_delete.svg'
import editIcon from '../../../public/icon/bx_edit.svg'

const fetchRecipes = async () => {
  try {
    const response = await fetch('/api/recipes');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

const calculateTotalCalories = (ingredients) => {
  return ingredients.reduce((total, ingredient) => total + ingredient.calories * ingredient.quantity, 0);
};

const Recipe = () => {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      const data = await fetchRecipes();
      setRecipes(data);
    };
    loadRecipes();
  }, []);

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`/api/recipes?id=${recipeToDelete.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      setRecipes(recipes.filter(r => r.id !== recipeToDelete.id));
      setShowModal(false);
      setRecipeToDelete(null);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleEditClick = (id) => {
    router.push(`/edit?id=${id}`);
  };

  return (
    <div className='m-4 mt-10 h-screen'>
      <h1 className="text-3xl font-bold mb-10">Recipes</h1>
      <div className="bg-white rounded-lg p-5">
        <h4 className='mb-5 text-lg font-bold'>Your recipe</h4>
        <div className='flex flex-wrap gap-5'>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="w-80 h-80 background-image rounded-xl dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between">
              <div className='m-5 p-3 py-6 rounded-xl bg-white'>
                <h5 className="mb-2 text-lg text-black">{recipe.name}</h5>
                <div className="font-bold text-2xl text-gray-700 dark:text-gray-400">
                  {calculateTotalCalories(recipe.ingredients)} <span className='text-customYellow'>Cal</span>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4 mb-5 mx-5'>
                <button className='flex justify-center space-x-2 py-2 px-4 bg-white rounded-3xl text-rose-500 font-medium'
                  onClick={() => handleDeleteClick(recipe)}
                >
                  <Image src={deleteIcon} alt="deleteIcon" width={24} height={24}/>
                  <span>Delete</span>
                </button>
                <button
                  className='flex justify-center space-x-2 py-2 px-4 bg-white rounded-3xl text-customBlack font-medium'
                  onClick={() => handleEditClick(recipe.id)}
                >
                  <Image src={editIcon} alt="editIcon" width={24} height={24}/>
                  <span>Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <DeleteModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Recipe;
