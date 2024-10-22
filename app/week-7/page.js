"use client";

import ItemList from "./item-list";

function Page() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Shopping List</h1>
      <ItemList />
    </main>
  );
}

export default Page;
