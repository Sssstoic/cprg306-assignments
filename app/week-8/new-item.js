"use client";

import { useState } from 'react';

export default function NewItem({ onAddItem }) { 
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const increment = () => {
    setQuantity((prevQuantity) => (prevQuantity < 20 ? prevQuantity + 1 : prevQuantity));
  };

  const decrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = { name, quantity, category };
    onAddItem(item); 
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 shadow rounded-lg w-full max-w-md mb-4">
      <div className="mb-2">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-1 w-full text-black rounded-md"
        />
      </div>

      <div className="flex items-center mb-2"> 
        <div className="flex items-center flex-grow mr-2"> 
          <button
            type="button"
            className="w-8 bg-blue-500 text-white font-semibold rounded-l-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 focus:ring-opacity-75"
            onClick={decrement}
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="text-base font-semibold flex-grow text-center text-black">{quantity}</span> 
          <button
            type="button"
            className="w-8 bg-blue-500 text-white font-semibold rounded-r-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 focus:ring-opacity-75"
            onClick={increment}
            disabled={quantity === 20}
          >
            +
          </button>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-1 text-black rounded-md flex-grow" 
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen">Frozen Foods</option>
          <option value="canned">Canned Goods</option>
          <option value="dry">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded-full w-full flex items-center justify-center shadow-md hover:bg-green-700" // Make it occupy full width
      >
        +
      </button>
    </form>
  );
}
