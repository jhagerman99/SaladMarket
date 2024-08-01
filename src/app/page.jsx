'use client';

import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import BottomBar from './components/BottomBar';
import Modal from './components/Modal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["vegetable", "fruit", "toppings", "protein", "dressing"];

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/ingredients');
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    fetchIngredients();
  }, []);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleIncreaseQuantity = (id) => {
    setAmounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setAmounts((prev) => {
      const newAmount = (prev[id] || 0) - 1;
      if (newAmount <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newAmount };
    });
  };

  const handleCreateRecipeClick = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateRecipe = () => {
    handleCloseModal();
    setAmounts({});
    router.push('/recipe');
  };

  const totalAmount = Object.values(amounts).reduce((sum, amount) => sum + amount, 0);

  const totalCalories = ingredients.reduce((sum, ingredient) => {
    const amount = amounts[ingredient.id] || 0;
    return sum + (amount * ingredient.calories);
  }, 0);

  const selectedIngredients = Object.entries(amounts).map(([id, quantity]) => {
    const ingredient = ingredients.find((ingredient) => ingredient.id === parseInt(id));
    return {
      ingredient: ingredient.ingredient,
      quantity,
      calories: ingredient.calories,
    };
  });

  const filteredIngredients = ingredients.filter((ingredient) => 
    ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(ingredient.category.toLowerCase()))
  );

  return (
    <div className="m-5 p-4 pb-44">
      {/* Header Section */}
      <header className="flex flex-col lg:flex-row justify-between items-center mb-5">
        <h1 className="text-4xl font-bold text-center text-customBlack">Let's Create...your own salad!!!</h1>
        <div className="relative">
          <svg className="absolute left-2 top-2 w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: '#F8B602' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.76-6.33a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"></path>
          </svg>
          <input 
            type="text" 
            placeholder="Search ingredients to make a salad..." 
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 rounded-lg w-128 lg:w-96 3xl:w-148 pl-10"
          />
        </div>
      </header>
      
      {/* Banner Section */}
      <div className="mb-4">
        <img src="/Banner.jpg" alt="Banner" className="w-full h-64 object-cover xl:object-contain 4xl:object-cover rounded-2xl"/>
      </div>

      {/* Category Select */}
      <section className="mt-5 mb-4">
        <h2 className="text-2xl text-customBlack font-semibold mb-5">Select Category</h2>
        <div className="flex flex-wrap justify-center xl:justify-start space-x-4">
          {categories.map((category) => (
            <div 
              key={category}
              className={`mb-5 relative cursor-pointer w-40 h-40 rounded-2xl overflow-hidden ${selectedCategories.includes(category) ? 'shadow-selected' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              <img 
                src={`/images/category/${category}.jpg`} 
                alt={category} 
                className="w-full h-full object-cover"
              />
              {selectedCategories.includes(category) && (
                <svg className="absolute top-2 right-2" width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.333344" width="21" height="21" rx="10.5" fill="#2FB62D"/>
                  <path d="M9.99309 15.5989L9.97326 15.6187L5.02344 10.6689L6.6352 9.0571L9.99315 12.415L15.3639 7.04428L16.9757 8.65604L10.013 15.6188L9.99309 15.5989Z" fill="white"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ingredients Grid */}
      <section>
        <h2 className="text-2xl font-semibold text-customBlack mt-5 md:text-start text-center">Choose your ingredients to make a salad</h2>
        <div className="grid place-items-center xl:place-items-start sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-4 gap-y-10 mt-5">
          {filteredIngredients.map((ingredient) => (
            <Card
              key={ingredient.id}
              image={ingredient.image || 'images/default-image.jpg'}
              name={ingredient.ingredient}
              calories={ingredient.calories}
            >
              <div className="flex items-center space-x-4">
                {amounts[ingredient.id] > 0 && (
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleDecreaseQuantity(ingredient.id)} 
                      className="inline-flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-2xl font-semibold">{amounts[ingredient.id]}</span>
                  </div>
                )}
                <button 
                  onClick={() => handleIncreaseQuantity(ingredient.id)} 
                  className="inline-flex items-center justify-center w-10 h-10 text-white bg-yellow-500 rounded-full hover:bg-yellow-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {totalAmount > 0 && (
        <BottomBar totalAmount={totalAmount} totalCalories={totalCalories} onCreateRecipe={handleCreateRecipeClick} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateRecipe}
        selectedIngredients={selectedIngredients}
      />
    </div>
  );
}
