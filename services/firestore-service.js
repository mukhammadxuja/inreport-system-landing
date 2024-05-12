import { auth, db, storage } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

// Add Item
export const addItem = async (source, data, files) => {
  const images = [];

  await Promise.all(
    files.map(async (file) => {
      const storageRef = ref(
        storage,
        `${source}/${auth.currentUser.uid}/images/${file.name}`
      );
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      images.push({ url: downloadURL, name: file.name, id: uuidv4() });
    })
  );

  const itemDoc = doc(
    collection(db, `users/${auth.currentUser.uid}/${source}`)
  );

  try {
    await setDoc(itemDoc, {
      id: itemDoc.id,
      ...data,
      images: images,
      hide: false,
      timestamp: new Date().getTime(),
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async (
  source,
  data,
  editableId,
  files,
  oldImages
) => {
  const images = [];

  await Promise.all(
    files.map(async (file) => {
      const storageRef = ref(
        storage,
        `${source}/${auth.currentUser.email}/images/${file.name}`
      );
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      images.push({
        url: downloadURL,
        name: file.name,
        id: uuidv4(),
      });
    })
  );

  const mergedImages = [...oldImages, ...images];

  const itemDoc = doc(
    db,
    `users/${auth.currentUser.uid}/${source}`,
    editableId
  );

  try {
    await updateDoc(itemDoc, {
      ...data,
      images: mergedImages,
      timestamp: new Date().getTime(),
    });
  } catch (error) {
    console.log(error);
  }
};

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

// Delete Image from field
export const handleFileRemove = async (
  source,
  fileName,
  projectId,
  imageId,
  setFiles
) => {
  setFiles((prevFiles) =>
    prevFiles.filter((prevFile) => prevFile.name !== fileName)
  );

  try {
    const projectRef = doc(
      db,
      `users/${auth.currentUser.uid}/${source}`,
      projectId
    );

    const projectSnapshot = await getDoc(projectRef);
    const projectData = projectSnapshot.data();

    if (!projectData) {
      console.error("Project not found");
      return;
    }

    const updatedImages = projectData.images.filter(
      (image) => image.id !== imageId
    );

    await updateDoc(projectRef, { images: updatedImages });
  } catch (error) {
    console.error("Error deleting image from project:", error);
  }
};

// Move Doc to another collection
export const moveDocToAnotherCollection = async (
  documentId,
  title,
  sourceCollection,
  destinationCollection
) => {
  try {
    // Retrieve the document from the source collection
    const sourceDocRef = doc(db, sourceCollection, documentId);
    const sourceDocSnapshot = await getDoc(sourceDocRef);
    if (!sourceDocSnapshot.exists()) {
      toast("Document not found in the source collection");
      return;
    }

    // Add the document to the destination collection
    const destinationCollectionRef = collection(db, destinationCollection);
    await addDoc(destinationCollectionRef, sourceDocSnapshot.data());

    // Delete the document from the original collection
    await deleteDoc(sourceDocRef);
    toast(`${title} moved to Side projects successfully`);
  } catch (error) {
    console.error("Error moving document:", error);
  }
};
