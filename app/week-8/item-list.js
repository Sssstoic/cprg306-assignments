"use client";

import { useState } from 'react';
import Item from './item';
import NewItem from './new-item'; 
import MealIdeas from './meal-ideas'; // Import the MealIdeas component
import items from './items.json';

function ItemList({ onItemSelect }) {
  const [sortBy, setSortBy] = useState('name');
  const [groupByCategory, setGroupByCategory] = useState(false);
  const [itemList, setItemList] = useState(items); 
  const [selectedItemName, setSelectedItemName] = useState(''); // State for the selected item name

  const addItem = (newItem) => {
    setItemList((prevItems) => [...prevItems, newItem]); 
  };

  const sortedItems = [...itemList].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const groupedItems = itemList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleItemSelect = (itemName) => {
    const cleanedItemName = itemName.split(',')[0].replace(/[^\w\s]/gi, '').trim();
    setSelectedItemName(cleanedItemName);
    onItemSelect(cleanedItemName); // Call the passed in onItemSelect function
  };

  return (
    <div className="flex flex-col mb-6">
      <div className="flex space-x-4 mb-4 items-start"> {/* Keep NewItem and MealIdeas in a flex container */}
        <NewItem onAddItem={addItem} /> {/* NewItem component remains unchanged */}
        <div className="flex-shrink-0 max-h-40 overflow-y-auto"> {/* Limit height and enable scrolling */}
          <MealIdeas ingredient={selectedItemName} /> {/* MealIdeas component placed beside NewItem */}
        </div>
      </div>

      <div className="flex space-x-4 mb-6 text-white">
        <span className="font-bold">Sort by:</span>
        <button
          onClick={() => {
            setSortBy('name');
            setGroupByCategory(false);
          }}
          className={`px-4 py-2 rounded-md ${sortBy === 'name' && !groupByCategory ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-600`}
        >
          Name
        </button>

        <button
          onClick={() => {
            setSortBy('category');
            setGroupByCategory(false);
          }}
          className={`px-4 py-2 rounded-md ${sortBy === 'category' && !groupByCategory ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-600`}
        >
          Category
        </button>

        <button
          onClick={() => {
            setGroupByCategory(true);
          }}
          className={`px-4 py-2 rounded-md ${groupByCategory ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'} hover:bg-blue-600`}
        >
          Group by Category
        </button>
      </div>

      <ul className="space-y-4">
        {!groupByCategory ? (
          sortedItems.map(item => (
            <Item 
              key={item.id} 
              name={item.name} 
              quantity={item.quantity} 
              category={item.category} 
              onSelect={handleItemSelect} // Pass the onSelect prop
            />
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
                    <Item 
                      key={item.id} 
                      name={item.name} 
                      quantity={item.quantity} 
                      category={item.category} 
                      onSelect={handleItemSelect} // Pass the onSelect prop
                    />
                  ))}
              </div>
            ))
        )}
      </ul>
    </div>
  );
}

export default ItemList;
