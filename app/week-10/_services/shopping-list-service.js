import { db } from "../_utils/firebase";
import { collection, getDocs, query, doc, deleteDoc, addDoc } from "firebase/firestore";

// Fetch items for a specific user
export const getItems = async (userId) => {
  const itemsCollection = collection(db, "users", userId, "items");
  const q = query(itemsCollection);
  const querySnapshot = await getDocs(q);
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
};

// Add an item to the Firestore collection
export const addItem = async (userId, item) => {
  const itemsCollection = collection(db, "users", userId, "items");
  const docRef = await addDoc(itemsCollection, item);
  return docRef.id;
};

// Delete an item from Firestore
export const deleteItem = async (userId, itemId) => {
  const itemDocRef = doc(db, "users", userId, "items", itemId);
  try {
    await deleteDoc(itemDocRef);  // Delete the document
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw new Error("Could not delete item.");
  }
};
