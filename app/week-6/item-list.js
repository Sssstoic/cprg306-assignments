"use client";

import { useState } from 'react';
import Item from './item';
import items from './items.json';

function ItemList() {
  const [sortBy, setSortBy] = useState('name');
  const [groupByCategory, setGroupByCategory] = useState(false);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex space-x-4 mb-6 text-white">
        <span className="font-bold">Sort by:</span>
        <button
          onClick={() => {
            setSortBy('name');
            setGroupByCategory(false);
          }}
          className={`px-4 py-2 rounded-md ${
            sortBy === 'name' && !groupByCategory ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
          } hover:bg-blue-600`}
        >
          Name
        </button>

        <button
          onClick={() => {
            setSortBy('category');
            setGroupByCategory(false);
          }}
          className={`px-4 py-2 rounded-md ${
            sortBy === 'category' && !groupByCategory ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
          } hover:bg-blue-600`}
        >
          Category
        </button>

        <button
          onClick={() => {
            setGroupByCategory(true);
          }}
          className={`px-4 py-2 rounded-md ${
            groupByCategory ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
          } hover:bg-blue-600`}
        >
          Group by Category
        </button>
      </div>

      <ul className="space-y-4">
        {!groupByCategory ? (
          sortedItems.map(item => (
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          ))
        ) : (
          Object.keys(groupedItems)
            .sort()
            .map(category => (
              <div key={category} className="mb-8">
                <h2 className="capitalize text-lg font-bold mb-2 text-white-500">
                  {category}
                </h2>
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(item => (
                    <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                  ))}
              </div>
            ))
        )}
      </ul>
    </div>
  );
}

export default ItemList;
