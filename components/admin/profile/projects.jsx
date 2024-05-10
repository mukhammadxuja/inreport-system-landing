/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useMemo, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
// Context
import { useApiContext } from "@/context/api-context";
// Firebase
import { auth, db, storage } from "@/firebase/config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Components
import MoveToSideProjects from "../dialogs/move-to-side-projects";
import DeleteProject from "../dialogs/delete-project";
import { toggleHide } from "@/services/firestore-service";
// Icons
import { ChevronRight, Shell, X } from "lucide-react";
import { EllipsesIcon, LoadingIcon } from "@/components/icons";

// UI
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast } from "sonner";

/**
 * TODO:
 * Loading and image lazy load
 * Refactor projects page (it should be last todo)
 *
 *
 * FEATURES
 * Move project to 'side projects'
 * Drag and drop project images
 *
 * unique username - https://www.reddit.com/r/Firebase/comments/pvkv4d/unique_usernames_in_firebase/
 * Analytics - https://chatgpt.com/c/d7cb4d18-bb6c-47d9-99fc-93f9e5381b17
 */

/**
 * FIXME:
 * Responsive
 */

const Projects = () => {
  const { user, projects } = useApiContext();

  const [addProject, setAddProject] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");
  const [loaded, setLoaded] = useState(false);

  console.log("projects", projects);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  function handleEdit(id) {
    setEditableId(id);
    setIsEdit(true);
  }

  const moveDocToAnotherCollection = async (
    documentId,
    title,
    sourceCollection,
    destinationCollection
  ) => {
    try {
      // Retrieve the document from the source collection
      const sourceDocRef = doc(
        db,
        `users/${auth.currentUser.uid}/projects`,
        documentId
      );
      const sourceDocSnapshot = await getDoc(sourceDocRef);
      if (!sourceDocSnapshot.exists()) {
        console.error("Document not found in the source collection");
        return;
      }

      // Add the document to the destination collection
      const destinationCollectionRef = collection(
        db,
        `users/${auth.currentUser.uid}/side-projects`
      );
      await addDoc(destinationCollectionRef, sourceDocSnapshot.data());

      // Delete the document from the original collection
      await deleteDoc(sourceDocRef);
      toast(`${title} moved to Side projects successfully`);
    } catch (error) {
      console.error("Error moving document:", error);
    }
  };

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
          className={addProject || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add project
        </Button>
      </div>
      <Separator />
      {addProject || isEdit ? (
        <Form
          userData={user}
          addProject={addProject}
          setAddProject={setAddProject}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editableId={editableId}
        />
      ) : (
        <>
          {projects.length ? (
            <div className="grid grid-cols-2 gap-3 my-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-start justify-between bg-gray-50 cursor-grab py-2 px-4 rounded-md border"
                >
                  <p>{project.year}</p>
                  <div className="space-y-3 w-[25rem]">
                    <div className={`${project.hide && "blur-[1.5px]"}`}>
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
                          {project.images.map(({ url, id, name }) => (
                            <div
                              key={id}
                              className="w-32 h-24 bg-indigo-200 rounded-md"
                            >
                              <Image
                                width={250}
                                height={150}
                                src={url ? url : "/assets/not-found.jpg"}
                                quality={80}
                                loading="lazy"
                                alt={name}
                                className={`${project.hide && "blur-[1.5px]"} ${
                                  loaded && "unblur"
                                } w-full h-full object-cover rounded cursor-pointer`}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <small
                          onClick={() =>
                            toggleHide("projects", project.id, project.hide)
                          }
                          className="hover:underline cursor-pointer"
                        >
                          {project.hide ? "Show" : "Hide"}
                        </small>
                        <small
                          onClick={() => handleEdit(project.id)}
                          className="hover:underline cursor-pointer"
                        >
                          Edit
                        </small>
                        <DeleteProject id={project.id} title={project.title}>
                          <small className="hover:underline cursor-pointer">
                            Delete
                          </small>
                        </DeleteProject>
                      </div>
                      <Popover>
                        <PopoverTrigger>
                          <EllipsesIcon />
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-fit p-2">
                          <MoveToSideProjects
                            id={project.id}
                            projectName={project.title}
                          >
                            <Button
                              onClick={() =>
                                moveDocToAnotherCollection(
                                  project.id,
                                  project.title
                                )
                              }
                              variant="ghost"
                              size="sm"
                            >
                              Move to Side Projects
                            </Button>
                          </MoveToSideProjects>
                        </PopoverContent>
                      </Popover>
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

const Form = ({ addProject, setAddProject, isEdit, setIsEdit, editableId }) => {
  return (
    <>
      {isEdit ? (
        <EditProjectForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addProject ? <AddProjectForm setAddProject={setAddProject} /> : null}
    </>
  );
};

function AddProjectForm({ setAddProject }) {
  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState([]);

  const form = useForm();

  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  // Delete all selected files
  const handleClearFiles = () => {
    setFiles([]);
  };

  // Delete one selected file
  const handleFileRemove = (fileId) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.name !== fileId)
    );
  };

  // Drag and drop selected file
  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFiles(items);
  }

  console.log(files);

  // Add project to database
  const addProject = async (data) => {
    if (isSending) return;
    setIsSending(true);

    const images = [];

    await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(
          storage,
          `projects/${auth.currentUser.uid}/images/${file.name}`
        );
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        images.push({ url: downloadURL, name: file.name, id: uuidv4() });
      })
    );

    try {
      const newDocRef = doc(
        collection(db, `users/${auth.currentUser.uid}/projects`)
      );

      await setDoc(newDocRef, {
        id: newDocRef.id,
        title: data.title,
        year: data.year,
        company: data.company,
        link: data.link,
        description: data.description,
        images: images,
        hide: false,
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
      onSubmit={handleSubmit(addProject)}
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
                value: 4,
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
                message: "Company name is required",
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
                message: "Link is required",
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
              value: 300,
              message: "Description is too long (only 300)",
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
                            <Image
                              key={index}
                              width={250}
                              height={150}
                              src={URL.createObjectURL(file)}
                              loading="lazy"
                              alt={file.name}
                              className="w-32 h-24 object-cover rounded-sm cursor-pointer"
                            />
                            <div className="flex items-center font-medium">
                              {file.name}
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
          disabled={isSubmitting}
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
}

function EditProjectForm({ setIsEdit, editableId }) {
  const { projects } = useApiContext();
  const project = projects.find((p) => p.id === editableId);

  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState([]);
  const images = [...project.images];

  files.map((file) => {
    images.push({
      url: URL.createObjectURL(file),
      name: file.name,
      id: uuidv4(),
    });
  });

  const defaultValues = useMemo(() => {
    return {
      title: project?.title,
      year: project?.year,
      company: project?.company,
      link: project?.link,
      description: project?.description,
    };
  }, [project]);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  // Delete all selected files
  const handleClearFiles = () => {
    setFiles([]);
  };

  // Delete one selected file
  const handleFileRemove = async (fileName, projectId, imageId) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.name !== fileName)
    );

    try {
      const projectRef = doc(
        db,
        `users/${auth.currentUser.uid}/projects`,
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

  console.log("files", files);

  // Add project to database
  const updateProject = async (data) => {
    if (isSending) return;
    setIsSending(true);

    const images = [];

    await Promise.all(
      files.map(async (file) => {
        const storageRef = ref(
          storage,
          `projects/${auth.currentUser.email}/images/${file.name}`
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

    const mergedImages = [...project.images, ...images];

    try {
      await updateDoc(
        doc(db, `users/${auth.currentUser.uid}/projects`, editableId),
        {
          title: data.title,
          year: data.year,
          company: data.company,
          link: data.link,
          description: data.description,
          images: mergedImages,
          timestamp: new Date().getTime(),
        }
      ).finally(() => {
        setIsEdit(false);
        setIsSending(false);
        console.log("perfect");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateProject)}
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
                value: 4,
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
                message: "Company name is required",
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
                message: "Link is required",
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
              value: 300,
              message: "Description is too long (only 300)",
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

        <div className="flex items-center gap-3">
          <ul className="flex items-center gap-3 !mt-3">
            {images.map(({ url, name, id }) => {
              return (
                <li
                  className="flex items-center justify-between p-1 rounded-md border"
                  key={id}
                >
                  <div className="relative">
                    <Image
                      width={250}
                      height={150}
                      src={url}
                      loading="lazy"
                      alt={name}
                      className="w-28 h-24 object-cover rounded-sm cursor-pointer"
                    />
                    <X
                      className="absolute top-1 right-1 w-6 bg-white text-black h-6 border rounded-full p-1 cursor-pointer"
                      onClick={() => handleFileRemove(name, project.id, id)}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Separator />
      <div className="space-x-2 flex justify-end">
        <Button
          disabled={isSubmitting}
          className="rounded-sm"
          variant="secondary"
          onClick={() => setIsEdit(false)}
        >
          Cancel
        </Button>
        <Button disabled={isSubmitting} className="rounded-sm" type="submit">
          {isSubmitting && (
            <Shell className="opacity-50 animate-spin w-4 h-4 mr-1.5" />
          )}
          Edit
        </Button>
      </div>
    </form>
  );
}
