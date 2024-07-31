import React from 'react';
import { useState } from 'react';

const Modal = ({ isOpen, onClose, onCreate, selectedIngredients }) => {
  if (!isOpen) return null;

  const [recipeName, setRecipeName] = useState('');

  const handleCreateRecipe = async () => {
    const newRecipe = {
      name: recipeName,
      ingredients: selectedIngredients
    };

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });

      if (response.ok) {
        onCreate();
      } else {
        console.error('Failed to create recipe');
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm mx-auto">

        <h2 className="text-center text-2xl font-bold mb-4">Create Recipe</h2>
        <input 
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter recipe name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateRecipe} 
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
