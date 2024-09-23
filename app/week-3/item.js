// app/week-3/item.js

function Item({ name, quantity, category }) {
  return (
    <li className="my-2">
      <span className="bg-white border p-3 rounded-md shadow-sm font-medium text-gray-700 text-lg inline-block w-full max-w-md">
        {name}
        <div className="text-gray-500 text-md mt-1">
          Buy {quantity} in {category}
        </div>
      </span>
    </li>
  );
}

export default Item;
