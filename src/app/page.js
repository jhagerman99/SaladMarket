'use client';

import React, { useEffect, useState } from 'react';
import Card from './components/Card'; // นำเข้า Card component

export default function Home() {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ["vegetable", "fruit", "Toppings", "protein", "dressing"];

  useEffect(() => {
    fetch('/api/ingredients')
      .then(response => response.json())
      .then(data => setIngredients(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const filteredIngredients = ingredients.filter(ingredient => 
    (ingredient.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '' || ingredient.category.toLowerCase() === selectedCategory.toLowerCase())
  );

  return (
    <div className="p-4">
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
        <img src="/images/Banner.jpg" alt="Banner" className="w-full h-64 object-cover rounded-2xl"/>
      </div>
      
      {/* Category Select */}
      <div className="mt-8 mb-4">
        <h2 className="text-2xl font-semibold mb-2">Select Category</h2>
        <div className="flex space-x-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className={`relative cursor-pointer w-40 h-40 rounded-2xl overflow-hidden ${selectedCategory === category ? 'shadow-selected' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              <img 
                src={`/images/${category}.jpg`} 
                alt={category} 
                className="w-full h-full object-cover"
              />
              {selectedCategory === category && (
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
        {filteredIngredients.map((ingredient, index) => (
          <Card 
            key={index} 
            image={ingredient.image || 'images/default-image.jpg'} // ใช้ default image ถ้าไม่มีรูปภาพ
            name={ingredient.ingredient} 
            calories={ingredient.calories}
          />
        ))}
      </div>
    </div>
  );
}
