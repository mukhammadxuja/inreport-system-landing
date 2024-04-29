/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Files from "react-files";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useAuthContext } from "@/context/auth-context";
import { updateUserAccount } from "@/firebase/auth/updateUserProfle";

// UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DoorClosed, X } from "lucide-react";

const Projects = () => {
  const { user } = useAuthContext();

  const [addProject, setAddProject] = useState(false);

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
        <Form userData={user} />
      ) : (
        <div className="flex flex-col items-center justify-center h-full py-10 space-y-3">
          <Image
            width={250}
            height={250}
            src="https://read.cv/_next/image?url=%2Fassets%2Fprojects.png&w=256&q=75"
            alt="Projects image"
          />
          <Button onClick={() => setAddProject(true)} variant="secondary">
            Add project
          </Button>
        </div>
      )}
    </div>
  );
};

export default Projects;

const Form = ({ userData }) => {
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

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data); // Log submitted data
    const { name, email } = data;
    const newData = { displayName: name, email };
    try {
      await updateUserAccount(newData);
      console.log("perfect");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  const [files, setFiles] = useState([]);
  const handleChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleFileRemove = (fileId) => {
    setFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.id !== fileId)
    );
  };

  const handleClearFiles = () => {
    setFiles([]);
  };

  console.log(files);

  const handleUploadFiles = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(
        file.id,
        new Blob([file], { type: file.type }),
        file.name || "file"
      );
    });

    axios
      .post("/files", formData)
      .then(() => {
        window.alert(`${files.length} files uploaded succesfully!`);
        setFiles([]);
      })
      .catch((err) => {
        window.alert(`Error uploading files: ${err.message}`);
      });
  };

  const finalSpaceCharacters = [
    {
      id: "gary",
      name: "Gary Goodspeed",
      thumb: "/images/gary.png",
    },
    {
      id: "cato",
      name: "Little Cato",
      thumb: "/images/cato.png",
    },
    {
      id: "kvn",
      name: "KVN",
      thumb: "/images/kvn.png",
    },
    {
      id: "mooncake",
      name: "Mooncake",
      thumb: "/images/mooncake.png",
    },
    {
      id: "quinn",
      name: "Quinn Ergon",
      thumb: "/images/quinn.png",
    },
  ];

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFiles(items);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="flex items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="My Great Project"
            {...register("title", {
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
          <p className="text-xs text-red-500">{errors.title?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="year">Year</Label>
          <Input
            type="number"
            id="year"
            placeholder="2024"
            {...register("year", {
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
          <p className="text-xs text-red-500">{errors.year?.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="client">Company or client</Label>
          <Input
            id="client"
            placeholder="Acme inc."
            {...register("client", {
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
          <p className="text-xs text-red-500">{errors.client?.message}</p>
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
              maxLength: {
                value: 20,
                message: "Name is too long",
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
              value: 20,
              message: "Name is too long",
            },
          })}
        />
        <p className="text-xs text-red-500">{errors.description?.message}</p>
      </div>
      <div className="space-y-1 w-full">
        <Label htmlFor="file">Attachments</Label>
        <Files
          id="file"
          className="flex items-center justify-center p-2 rounded-lg border-2 border-dashed"
          dragActiveClassName="files-dropzone-active"
          style={{ height: "100px" }}
          onChange={handleChange}
          multiple
          maxFiles={5}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="grid grid-cols-2 gap-3 !mt-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {files.map(({ id, preview, name, sizeReadable }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          key={id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center justify-between py-2 pl-2 pr-4 rounded-md border cursor-grab"
                        >
                          <div className="flex items-center gap-3">
                            <div className="files-list-item-preview">
                              {preview.type === "image" ? (
                                <img
                                  className="w-32 rounded-md"
                                  src={preview.url}
                                />
                              ) : (
                                <div className="-list-item-preview-extension">
                                  {extension}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center font-medium">
                              {name}
                              <span className="text-sm pl-1 font-light">
                                ({sizeReadable})
                              </span>
                            </div>
                          </div>
                          <X
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => handleFileRemove(id)}
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
            {/* <Button variant="outline" onClick={handleUploadFiles}>
              Upload
            </Button> */}
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
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Save
        </Button>
      </div>
    </form>
  );
};
