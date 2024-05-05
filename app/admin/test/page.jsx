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
import { db } from "@/firebase/config";

const fileTypes = ["JPEG", "PNG", "GIF"];

function TestPage() {
  const form = useForm();

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
      await addDoc(collection(db, "books"), {
        title: newBook.title,
        catalog: newBook.catalog,
        price: newBook.price,
      });
      console.log("Perfect");
      setNewBook({
        title: "",
        catalog: "",
        price: "",
      });
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
  console.log(file);

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
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>

      <div className="mt-10 bg-white rounded-lg p-4">
        {!books.length && <p className="text-center">No books</p>}
        {!!books.length && (
          <ul className="space-y-2">
            {books.map((book) => (
              <li
                className="flex items-center justify-between bg-gray-200 py-2 px-4 rounded-md"
                key={book.title}
              >
                <div className="flex items-center space-x-2">
                  <span>{book.title}</span>
                  <span>({book.catalog})</span>
                  <span>${book.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Pencil
                    onClick={() => updateBook(book.id)}
                    className="cursor-pointer"
                  />
                  <Trash2
                    onClick={() => deleteBook(book.id)}
                    className="cursor-pointer"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TestPage;
