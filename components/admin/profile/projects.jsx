/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Files from "react-files";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useApiContext } from "@/context/api-context";
import { updateUserAccount } from "@/firebase/auth/updateUserProfle";

// UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Shell, X } from "lucide-react";
import { auth, db, storage } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Projects = () => {
  const { user, projects, setProjects } = useApiContext();

  const [addProject, setAddProject] = useState(false);

  console.log("projects", projects);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Projects
          </h3>
        </div>
        <Button
          onClick={() => setAddProject(true)}
          className={addProject ? "hidden" : "block"}
          variant="secondary"
        >
          Add project
        </Button>
      </div>
      <Separator />
      {addProject ? (
        <Form userData={user} setAddProject={setAddProject} />
      ) : (
        <>
          {projects.length ? (
            <div className="grid grid-cols-2 gap-3 my-2">
              {projects.map((project) => (
                <div
                  key={project.uid}
                  className="flex items-start justify-between bg-gray-50 cursor-grab py-2 px-4 rounded-md border"
                >
                  <p>{project.year}</p>
                  <div className="space-y-3 w-[25rem]">
                    <div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center font-medium hover:underline cursor-pointer"
                      >
                        {project.title} at {project.company}
                        <ChevronRight className="w-4 h-4" />
                      </a>
                      <p className="text-gray-500">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-3 overflow-x-scroll">
                      {project.images && project.images.length > 0 && (
                        <div className="flex items-center gap-2">
                          {/* Map through images and render each */}
                          {project.images.map((image, index) => (
                            <div key={index} className="w-32 rounded-md">
                              <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover rounded cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex itemc space-x-2">
                        <small className="hover:underline cursor-pointer">
                          Hide
                        </small>
                        <small className="hover:underline cursor-pointer">
                          Edit
                        </small>
                        <small className="hover:underline cursor-pointer">
                          Delete
                        </small>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center !min-h-[calc(100vh-14rem)] py-10 space-y-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-12 h-12 text-yellow-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>

              <Button onClick={() => setAddProject(true)} variant="secondary">
                Add project
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;

const Form = ({ userData, setAddProject }) => {
  const defaultValues = useMemo(() => {
    return {
      name: userData?.displayName,
      // username: userData?.username ? userData.username : "",
      email: userData?.email ? userData.email : "",
    };
  }, [userData]);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, handleSubmit, setValue, reset, resetField } =
    form;

  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [defaultValues, isSubmitSuccessful, reset]);

  const [files, setFiles] = useState([]);

  const handleFileRemove = (fileId) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.name !== fileId)
    );
  };

  const handleClearFiles = () => {
    setFiles([]);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFiles(items);
  }

  const [isSending, setIsSending] = useState(false);

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const saveProject = async (data) => {
    if (isSending) return;
    setIsSending(true);

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
      await addDoc(collection(db, `users/${auth.currentUser.uid}/projects`), {
        title: data.title,
        year: data.year,
        company: data.company,
        link: data.link,
        description: data.description,
        images: images,
        timestamp: new Date().getTime(),
      }).finally(() => {
        setAddProject(false);
        setIsSending(false);
        console.log("perfect");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(saveProject)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="flex items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="title">
            Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="My Great Project"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
              maxLength: {
                value: 20,
                message: "Title is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="year">
            Year<span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            id="year"
            placeholder="2024"
            {...register("year", {
              required: {
                value: true,
                message: "Year is required",
              },
              maxLength: {
                value: 20,
                message: "Year is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.year?.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="company">Company or client</Label>
          <Input
            id="company"
            placeholder="Acme inc."
            {...register("company", {
              required: {
                value: true,
                message: "Name is required",
              },
              maxLength: {
                value: 20,
                message: "Name is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.company?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="link">Link to project</Label>
          <Input
            id="link"
            placeholder="https://example.com"
            {...register("link", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.link?.message}</p>
        </div>
      </div>
      <div className="space-y-1 w-full">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Cool project"
          {...register("description", {
            required: {
              value: true,
              message: "Name is required",
            },
            maxLength: {
              value: 70,
              message: "Name is too long",
            },
          })}
        />
        <p className="text-xs text-red-500">{errors.description?.message}</p>
      </div>

      <div className="space-y-1 w-full">
        <div className="mx-auto w-full">
          <Label htmlFor="upload">Attachments</Label>
          <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all duration-300 hover:border-gray-400">
            <div className="space-y-1 text-center">
              <div className="text-gray-600">
                <a
                  href="#"
                  className="font-medium text-primary-500 hover:text-primary-700"
                >
                  Click to upload
                </a>
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

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="grid grid-cols-2 gap-3 !mt-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {files.map((file, index) => {
                  return (
                    <Draggable
                      key={file.name}
                      draggableId={file.name}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          key={file.name}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between py-2 pl-2 pr-4 rounded-md border cursor-grab"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              key={index}
                              src={URL.createObjectURL(file)}
                              alt={`image-${index}`}
                              className="w-24 rounded-md"
                            />
                            <div className="flex items-center font-medium">
                              {file.name}
                              {/* <span className="text-sm pl-1 font-light">
                                {file.size}
                              </span> */}
                            </div>
                          </div>
                          <X
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => handleFileRemove(file.name)}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            )}
          </Droppable>
        </DragDropContext>

        {!!files.length && (
          <div className="flex gap-2 !my-3">
            <Button variant="destructive" onClick={handleClearFiles}>
              Remove All Files
            </Button>
          </div>
        )}
      </div>
      <Separator />
      <div className="space-x-2 flex justify-end">
        <Button
          disabled={isSubmitting || !isDirty}
          className="rounded-sm"
          variant="secondary"
          onClick={() => setAddProject(false)}
        >
          Cancel
        </Button>
        <Button
          disabled={isSubmitting || !isDirty}
          className="rounded-sm"
          type="submit"
        >
          {isSubmitting && (
            <Shell className="opacity-50 animate-spin w-4 h-4 mr-1.5" />
          )}
          Save
        </Button>
      </div>
    </form>
  );
};
