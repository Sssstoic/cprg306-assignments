"use client";
import { useUserAuth } from "../_utils/auth-context";

function Item({ name, quantity, category, onSelect, onDelete }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(name); 
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent item click handler from firing
    if (onDelete) {
      onDelete(); // Trigger the onDelete function passed as a prop
    }
  };

  return (
    <li 
      className="my-2" 
      onClick={handleClick} 
      style={{ cursor: 'pointer' }}
    >
      <span 
        className="bg-white border p-3 rounded-md shadow-sm font-medium text-gray-700 text-lg w-full max-w-md flex justify-between items-center"
      >
        <div className="flex-1">
          <strong className="text-black">{name}</strong>
          <div className="text-black text-md mt-1">
            Buy {quantity} in <span className="text-black">{category}</span>
          </div>
        </div>

        {/* Delete Button inside the box */}
        <button
          onClick={handleDeleteClick}
          className="text-red-500 hover:text-red-700"
          title="Delete Item"
        >
          🗑️
        </button>
      </span>
    </li>
  );
}

export default Item;
