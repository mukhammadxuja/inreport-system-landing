import { auth, db } from "@/firebase/config";
import { deleteDoc, deleteField, doc, updateDoc } from "firebase/firestore";

// Delete item
export const deleteItem = async (collection, id) => {
  await deleteDoc(doc(db, `users/${auth.currentUser.uid}/${collection}`, id));
};

// Delete item image
export const deleteItemImage = async (collection, id, index) => {
  const itemRef = doc(db, `users/${auth.currentUser.uid}/${collection}`, id);

  await updateDoc(itemRef, {
    images: deleteField(),
  });
};

// Hide item
export const toggleHide = async (collection, id, currentHideValue) => {
  try {
    const docRef = doc(db, `users/${auth.currentUser.uid}/${collection}`, id);

    await updateDoc(docRef, {
      hide: !currentHideValue,
    });
  } catch (error) {
    console.log(error);
  }
};
