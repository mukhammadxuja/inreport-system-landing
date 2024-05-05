/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Delete, Pencil, Trash2 } from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function TestPage() {
  const form = useForm();
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const [books, setBooks] = useState([]);

  const [newBook, setNewBook] = useState({
    title: "",
    catalog: "",
    price: null,
  });

  // Add book
  const addBook = async (e) => {
    e.preventDefault();

    if (newBook.title.trim() !== "" || newBook.price.trim() !== "") {
      const images = [];

      // Upload images to Firebase Storage
      await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(
            storage,
            `projects/${auth.currentUser.uid}/images/${file.name}`
          );
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          images.push(downloadURL);
        })
      );

      await addDoc(collection(db, "books"), {
        title: newBook.title,
        catalog: newBook.catalog,
        price: newBook.price,
        images: images,
      });
      console.log("Perfect");
      setNewBook({
        title: "",
        catalog: "",
        price: "",
      });
      setFiles([]);
    }
  };

  // Update book
  const updateBook = async (id, updatedBook) => {
    console.log("update");
  };

  // Read book
  useEffect(() => {
    const q = query(collection(db, "books"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let booksArr = [];

      querySnapshot.forEach((doc) => {
        booksArr.push({ ...doc.data(), id: doc.id });
      });

      setBooks(booksArr);
    });
  }, []);

  // Delete book
  const deleteBook = async (id) => {
    await deleteDoc(doc(db, "books", id));
  };
  console.log(books);

  return (
    <div className="flex flex-col mt-10 min-h-screen max-w-lg mx-auto">
      <form onSubmit={addBook} className="w-full space-y-2">
        <div>
          <Label>Title</Label>
          <Input
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            placeholder="Your Book"
          />
        </div>
        <div>
          <Label>Catalog</Label>
          <Select
            defaultValue="romantic"
            onValueChange={(e) => setNewBook({ ...newBook, catalog: e })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="horror">Horror</SelectItem>
                <SelectItem value="romantic">Romantic</SelectItem>
                <SelectItem value="coding">Coding</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Price</Label>
          <Input
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
            type="number"
            placeholder="Price"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>

      <div className="mt-10 bg-white rounded-lg p-4">
        {!books.length && <p className="text-center">No books</p>}
        {!!books.length && (
          <ul className="space-y-2">
            {books.map((item) => (
              <div
                key={item.title}
                className="w-full rounded overflow-hidden shadow-lg m-4"
              >
                {/* Assuming there are images */}
                {item.images && item.images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {/* Map through images and render each */}
                    {item.images.map((image, index) => (
                      <div key={index} className="h-24 bg-gray-300">
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{item.title}</div>
                  <p className="text-gray-700 text-base">
                    Catalog: {item.catalog}
                    <br />
                    Price: ${item.price}
                  </p>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>

      {files.length > 0 && (
        <div>
          <h2>Selected Files:</h2>
          <div className="flex items-center gap-2">
            {files.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`image-${index}`}
                className="w-44 rounded"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;
