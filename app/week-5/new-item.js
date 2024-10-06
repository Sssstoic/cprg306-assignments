"use client";

import { useState } from 'react';

export default function NewItem() {
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
    console.log(item);
    alert(`Added item: ${name}, Quantity: ${quantity}, Category: ${category}`);
    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded w-auto max-w-lg mx-auto">
      {/* Name field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 w-full text-black"
        />
      </div>

      {/* Quantity counter */}
      <div className="flex items-center p-2 m-4 bg-white text-black w-36 border">
        <span className="text-base font-semibold flex-grow text-left">{quantity}</span>
        <button
          type="button"
          className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 focus:ring-opacity-75"
          onClick={decrement}
          disabled={quantity === 1}
        >
          -
        </button>
        <button
          type="button"
          className="w-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400 focus:ring-opacity-75 ml-1"
          onClick={increment}
          disabled={quantity === 20}
        >
          +
        </button>
      </div>

      {/* Category field */}
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full text-black"
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

      {/* Submit button */}
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-green-700"
      >
        +
      </button>
    </form>
  );
}
