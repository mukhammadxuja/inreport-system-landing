import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const useUserSubcollections = (db, userId, collectionName, from) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!userId || !from) return;

    const subcollection = collection(db, `users/${userId}/${collectionName}`);
    const q = query(subcollection, orderBy(from));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setItems(itemsArr);
    });

    return () => unsubscribe();
  }, [db, userId, collectionName, from]);

  return items;
};

export default useUserSubcollections;
