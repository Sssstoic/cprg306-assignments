"use client";

import { useState } from "react";
import Item from "./item";
import NewItem from "./new-item"; // Import NewItem component

const initialItems = [
  { id: "1", name: "milk, 4 L 🥛", quantity: 1, category: "dairy" },
  { id: "2", name: "bread 🍞", quantity: 2, category: "bakery" },
  { id: "3", name: "eggs, dozen 🥚", quantity: 2, category: "dairy" },
  { id: "4", name: "bananas 🍌", quantity: 6, category: "produce" },
  { id: "5", name: "broccoli 🥦", quantity: 3, category: "produce" },
  { id: "6", name: "chicken breasts, 1 kg 🍗", quantity: 1, category: "meat" },
  { id: "7", name: "pasta sauce 🍝", quantity: 3, category: "canned goods" },
  { id: "8", name: "spaghetti, 454 g 🍝", quantity: 2, category: "dry goods" },
  { id: "9", name: "toilet paper, 12 pack 🧻", quantity: 1, category: "household" },
  { id: "10", name: "paper towels, 6 pack", quantity: 1, category: "household" },
  { id: "11", name: "dish soap 🍽️", quantity: 1, category: "household" },
  { id: "12", name: "hand soap 🧼", quantity: 4, category: "household" },
];

const ItemList = () => {
  const [items, setItems] = useState(initialItems);
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false);

  // Function to add a new item to the array
  const addItem = (newItem) => {
    setItems([...items, { ...newItem, id: (items.length + 1).toString() }]); // Add item with unique id
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
  });

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      <NewItem onAddItem={addItem} className="mb-6" /> {/* Pass the addItem function to NewItem */}

      {/* Sort and group buttons */}
      <div className="flex space-x-4 mb-6 text-white">
        <span className="font-bold">Sort by:</span>
        <button
          onClick={() => {
            setSortBy("name");
            setGroupByCategory(false);
          }}
          className={`px-4 py-2 rounded-md ${
            sortBy === "name" && !groupByCategory ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          } hover:bg-blue-600`}
        >
          Name
        </button>

        <button
          onClick={() => {
            setSortBy("category");
            setGroupByCategory(false);
          }}
          className={`px-4 py-2 rounded-md ${
            sortBy === "category" && !groupByCategory ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          } hover:bg-blue-600`}
        >
          Category
        </button>

        <button
          onClick={() => {
            setGroupByCategory(true);
          }}
          className={`px-4 py-2 rounded-md ${
            groupByCategory ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          } hover:bg-blue-600`}
        >
          Group by Category
        </button>
      </div>

      {/* Item List */}
      <ul className="space-y-4">
        {!groupByCategory ? (
          sortedItems.map((item) => (
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          ))
        ) : (
          Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category} className="mb-8">
                <h2 className="capitalize text-lg font-bold mb-2 text-white-500">{category}</h2>
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                  ))}
              </div>
            ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;
