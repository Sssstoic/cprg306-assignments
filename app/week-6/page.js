import ItemList from './item-list';

function Page() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-6">Shopping List</h1>
      <ItemList />
    </main>
  );
}

export default Page;
