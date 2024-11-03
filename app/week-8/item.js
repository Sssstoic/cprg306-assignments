"use client";

function Item({ name, quantity, category, onSelect }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(name); // Call the onSelect function with the item's name
    }
  };

  return (
    <li className="my-2" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <span className="bg-white border p-3 rounded-md shadow-sm font-medium text-gray-700 text-lg inline-block w-full max-w-md">
        <strong className="text-black">{name}</strong>
        <div className="text-black text-md mt-1">
          Buy {quantity} in <span className="text-black">{category}</span>
        </div>
      </span>
    </li>
  );
}

export default Item;
