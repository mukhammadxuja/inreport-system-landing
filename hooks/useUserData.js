import { useState, useEffect } from 'react';
import { query, collection, where, getDocs } from 'firebase/firestore';

const useUserData = (db, username) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setUserData(querySnapshot.docs[0].data());
      }
      setLoading(false);
    };

    fetchData();
  }, [db, username]);

  return { userData, loading };
};

export default useUserData;
