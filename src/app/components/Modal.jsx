import React, { useState } from 'react';
import locationSvg from '../../../public/icon/RestaurantLocation.svg';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, onCreate, selectedIngredients }) => {
  if (!isOpen) return null;

  const [recipeName, setRecipeName] = useState('');

  const handleCreateRecipe = async () => {
    const newRecipe = {
      name: recipeName,
      ingredients: selectedIngredients,
    };

    try {
      console.log('Creating new recipe:', newRecipe);
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        const createdRecipe = await response.json();
        console.log('Recipe created:', createdRecipe);
        onCreate();
      } else {
        console.error('Failed to create recipe:', await response.text());
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-128 bg-white rounded-lg p-8 flex flex-col items-center justify-center">
        <button onClick={onClose}className="absolute top-2 right-5 p-2 rounded-full hover:bg-gray-200">
          <FaTimes className="text-gray-300" size={15} />
        </button>
        <Image src={locationSvg} alt="locationSvg" width={72} height={72} />
        <h2 className="text-center text-xl font-bold my-4">Create Recipe</h2>
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Input Your Recipe Name..."
          className="w-full p-2 border border-gray-300 rounded-lg mb-10"
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="py-3 px-5 rounded-lg hover:bg-gray-400 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateRecipe}
            className="py-3 px-5 bg-customGreen text-white rounded-lg hover:bg-green-600 font-semibold"
          >
            Create New Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
