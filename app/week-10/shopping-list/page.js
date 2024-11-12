"use client";

import { useState, useEffect } from "react";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas"; 
import { useUserAuth } from "../_utils/auth-context"; 
import { useRouter } from "next/navigation";
import { getItems, addItem } from "../_services/shopping-list-service"; // Import the functions

function Page() {
  const [selectedItemName, setSelectedItemName] = useState("");
  const [items, setItems] = useState([]); // State to hold items fetched from Firestore
  const { user, firebaseSignOut } = useUserAuth(); 
  const router = useRouter();

  const handleItemSelect = (name) => {
    const cleanName = name.split(",")[0].trim();
    setSelectedItemName(cleanName);
  };

  const loadItems = async () => {
    if (user) {
      const userItems = await getItems(user.uid); 
      setItems(userItems); 
    }
  };

  useEffect(() => {
    loadItems();
  }, [user]);

  const logout = async () => {
    await firebaseSignOut();
    router.push("/"); 
  };

  const handleAddItem = async (newItem) => {
    if (user) {
      const newItemId = await addItem(user.uid, newItem); 
      setItems((prevItems) => [...prevItems, { ...newItem, id: newItemId }]);
    }
  };

  return (
    <main className="p-8 flex">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-white">Shopping List</h1>

        {user && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors mb-4"
          >
            Logout
          </button>
        )}

        <ItemList items={items} onItemSelect={handleItemSelect} />
      </div>
    </main>
  );
}

export default Page;
