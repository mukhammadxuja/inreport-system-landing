/* eslint-disable jsx-a11y/alt-text */
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
import { Delete, Pencil, Trash, Trash2, X } from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "@/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";

function TestPage() {
  const [files, setFiles] = useState([]);
  const [rate, setRate] = useState(0);

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

      try {
        const docRef = doc(collection(db, "books"));

        await addBook(docRef, {
          id: docRef.id,
          title: newBook.title,
          catalog: newBook.catalog,
          price: newBook.price,
          images: images,
          rate: rate,
          timestamp: new Date().getTime(),
        }).finally(() => {
          setBooks({
            title: "",
            catalog: "",
            price: null,
          });
          setFiles([]);
          toast("perfect");
        });
      } catch (error) {
        console.log(error);
      }
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

  const [showViewer, setShowViewer] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setShowViewer(true);
  };

  const closeImageViewer = () => {
    setShowViewer(false);
  };

  const images = [
    "/assets/emojis/1.png",
    "/assets/emojis/2.png",
    "/assets/emojis/3.png",
  ];

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
            defaultValue="fantasy"
            onValueChange={(e) => setNewBook({ ...newBook, catalog: e })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Catalog</SelectLabel>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="science-fiction">Science Fiction</SelectItem>
                <SelectItem value="mystery">Mystery</SelectItem>
                <SelectItem value="romance">Romance</SelectItem>
                <SelectItem value="thriller">Thriller</SelectItem>
                <SelectItem value="historical">Historical Fiction</SelectItem>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="dystopian">Dystopian</SelectItem>
                <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                <SelectItem value="biography">Biography</SelectItem>
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

        <div className="flex items-center gap-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              onClick={() => setRate(index)}
              className={`${
                rate === index && "border-black"
              } px-3 py-2 rounded-md border-2 !cursor-pointer hover:border-black duration-300`}
            >
              <img
                className="w-6"
                src={`/assets/emojis/${index + 1}.png`}
                alt={index}
              />
            </div>
          ))}
        </div>

        <div className="mx-auto w-full">
          <Label htmlFor="upload">Attachments</Label>
          <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all duration-300 hover:border-gray-400">
            <div className="space-y-1 text-center">
              <div className="text-gray-600">
                <p className="font-medium text-primary-500 hover:text-primary-700">
                  Click to upload
                </p>
              </div>
              <p className="text-sm text-gray-500">
                PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
            <input
              id="upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="flex items-center gap-2">
            {files.map((file) => (
              <li
                className="flex items-center justify-between p-1 rounded-md border"
                key={file.name}
              >
                <div className="relative">
                  <img
                    className="w-36 rounded-md"
                    src={URL.createObjectURL(file)}
                  />
                  <X
                    className="absolute top-1 right-1 w-6 bg-white text-black h-6 border rounded-full p-1 cursor-pointer"
                    onClick={() => console.log("deleted in your dream")}
                  />
                </div>
              </li>
            ))}
          </div>
        )}
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
                    <Trash onClick={() => deleteBook(item.id)} />
                  </div>
                )}
                <img src={`/assets/emojis/${item?.rate}.png`} />
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

      <div>
        <h1>Custom Image Viewer</h1>
        <div className="image-grid">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              onClick={() => openImageViewer(index)}
            />
          ))}
        </div>
        {showViewer && (
          <ImageViewer images={images} onClose={closeImageViewer} />
        )}
      </div>
    </div>
  );
}

export default TestPage;

const ImageViewer = ({ images, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleMouseEnter = (event) => {
    const { clientX, target } = event;
    const { left, width } = target.getBoundingClientRect();
    const offsetX = clientX - left;
    if (offsetX <= width / 2) {
      event.target.style.cursor =
        'url("https://cdn-icons-png.flaticon.com/512/748/748113.png"), auto';
    } else {
      event.target.style.cursor =
        'url("https://cdn-icons-png.flaticon.com/512/748/748121.png"), auto';
    }
  };

  const handleMouseLeave = (event) => {
    event.target.style.cursor = "auto";
  };

  const handleMouseMove = (event) => {
    const { clientX, target } = event;
    const { left, width } = target.getBoundingClientRect();
    const offsetX = clientX - left;
    if (offsetX <= width / 2) {
      target.style.cursor =
        'url("https://cdn-icons-png.flaticon.com/512/748/748113.png"), auto';
    } else {
      target.style.cursor =
        'url("https://cdn-icons-png.flaticon.com/512/748/748121.png"), auto';
    }
  };

  return (
    <div className="image-viewer">
      <div className="overlay" onClick={onClose}></div>
      <div
        className="modal"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={images[currentImageIndex]}
          alt={images[currentImageIndex]}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <div className="controls">
          <button onClick={prevImage}>&#10094;</button>
          <button onClick={nextImage}>&#10095;</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};
