"use client";

import { useState } from "react";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas"; 
import { useUserAuth } from "../_utils/auth-context"; 
import { useRouter } from "next/navigation"; 

function Page() {
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user, firebaseSignOut } = useUserAuth(); 
  const router = useRouter();

  const handleItemSelect = (name) => {
    const cleanName = name.split(",")[0].trim();
    setSelectedItemName(cleanName);
  };

  const logout = async () => {
    await firebaseSignOut();
    router.push("/"); 
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

        <ItemList onItemSelect={handleItemSelect} />
      </div>
    </main>
  );
}

export default Page;
