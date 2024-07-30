'use client';

import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import BottomBar from './components/BottomBar';
import Modal from './components/Modal'; // Import Modal component

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipeName, setRecipeName] = useState('');

  const categories = ["vegetable", "fruit", "toppings", "protein", "dressing"];

  useEffect(() => {
    fetch('/api/ingredients')
      .then(response => response.json())
      .then(data => setIngredients(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(prevSelectedCategories =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter(c => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const filteredIngredients = ingredients.filter(ingredient => 
    (ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory.length === 0 || selectedCategory.includes(ingredient.category.toLowerCase()))
  );

  const handleIncreaseQuantity = (id) => {
    setAmounts(prevAmounts => ({
      ...prevAmounts,
      [id]: (prevAmounts[id] || 0) + 1
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setAmounts(prevAmounts => {
      const currentAmount = (prevAmounts[id] || 0);
      if (currentAmount === 1) {
        handleRemoveIngredient(id);
        return prevAmounts;
      }
      return {
        ...prevAmounts,
        [id]: currentAmount - 1
      };
    });
  };

  const handleRemoveIngredient = (id) => {
    setAmounts(prevAmounts => {
      const newAmounts = { ...prevAmounts };
      delete newAmounts[id];
      return newAmounts;
    });
  };

  const handleCreateRecipeClick = () => {
    console.log('Clicked');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRecipeName('');
  };

  const handleCreateRecipe = () => {
    // Implement any additional logic if needed after recipe creation
    console.log('Recipe Created:', recipeName);
    handleCloseModal();
  };

  // Calculate total amount and calories
  const totalAmount = Object.values(amounts).reduce((sum, amount) => sum + amount, 0);
  const totalCalories = ingredients.reduce((sum, ingredient) => {
    const amount = amounts[ingredient.id] || 0;
    return sum + (amount * ingredient.calories);
  }, 0);


  const selectedIngredients = Object.entries(amounts).map(([id, quantity]) => {
    const ingredient = ingredients.find(ingredient => ingredient.id === parseInt(id));
    return {
      ingredient: ingredient.ingredient,
      quantity,
      calories: ingredient.calories
    };
  });

  return (
    <div className="mt-5 p-4 pb-44">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Let's Create...your own salad!!!</h1>
        <div className="relative">
          <svg className="absolute left-2 top-2 w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: '#F8B602' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.76-6.33a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search ingredients..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-lg w-128 pl-10" // เพิ่ม padding ทางซ้ายสำหรับไอคอน
          />
        </div>
      </div>
      
      {/* Image Section */}
      <div className="mb-4">
        <img src="/Banner.jpg" alt="Banner" className="w-full h-64 object-cover rounded-2xl"/>
      </div>
      
      {/* Category Select */}
      <div className="mt-8 mb-4">
        <h2 className="text-2xl font-semibold mb-2">Select Category</h2>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <div 
              key={category}
              className={`relative cursor-pointer w-40 h-40 rounded-2xl overflow-hidden ${selectedCategory.includes(category) ? 'shadow-selected' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              <img 
                src={`/images/${category}.jpg`} 
                alt={category} 
                className="w-full h-full object-cover"
              />
              {selectedCategory.includes(category) && (
                <svg className="absolute top-2 right-2 w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ingredients Grid */}
      <h2 className="text-2xl font-semibold m-2">Choose your ingredients to make a salad</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 gap-y-10">
        {filteredIngredients.map((ingredient) => (
          <Card
            key={ingredient.id}
            image={ingredient.image || 'images/default-image.jpg'}
            name={ingredient.ingredient}
            calories={ingredient.calories}
          >
            {amounts[ingredient.id] > 0 ? (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleDecreaseQuantity(ingredient.id)} 
                  className="inline-flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-xl">{amounts[ingredient.id]}</span>
                <button
                  onClick={() => handleIncreaseQuantity(ingredient.id)} 
                  className="inline-flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => handleIncreaseQuantity(ingredient.id)} 
                className="inline-flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </Card>
        ))}
      </div>

      {/* Conditionally Render Bottom Bar */}
      {totalAmount > 0 && (
        <BottomBar totalAmount={totalAmount} totalCalories={totalCalories} onCreateRecipe={handleCreateRecipeClick} />
      )}

      {/* Render Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateRecipe}
        recipeName={recipeName}
        setRecipeName={setRecipeName}
        selectedIngredients={selectedIngredients}
      />

    </div>
  );
}
