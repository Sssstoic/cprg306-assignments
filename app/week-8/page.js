"use client";

import { useState } from "react";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas"; // Import the MealIdeas component

function Page() {
  const [selectedItemName, setSelectedItemName] = useState("");

  const handleItemSelect = (name) => {
    const cleanName = name.split(",")[0].trim(); // Clean up the item name
    setSelectedItemName(cleanName); // Update the selected item name
  };

  return (
    <main className="p-8 flex">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-white">Shopping List</h1>
        
        <ItemList onItemSelect={handleItemSelect} /> {/* Pass onItemSelect here */}
      </div>
    </main>
  );
}

export default Page;
