/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Files from "react-files";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useApiContext } from "@/context/api-context";
import { updateUserAccount } from "@/firebase/auth/updateUserProfile";

// UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DoorClosed, X } from "lucide-react";

const Volunteering = () => {
  const { user } = useApiContext();

  const [addVolunteering, setAddVolunteering] = useState(false);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Volunteering
          </h3>
        </div>
        <Button
          onClick={() => setAddVolunteering(true)}
          className={addVolunteering ? "hidden" : "block"}
          variant="secondary"
        >
          Add volunteering
        </Button>
      </div>
      <Separator />
      {addVolunteering ? (
        <Form userData={user} setAddVolunteering={setAddVolunteering} />
      ) : (
        <div className="flex flex-col items-center justify-center !min-h-[calc(100vh-14rem)] py-10 space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          <Button onClick={() => setAddVolunteering(true)} variant="secondary">
            Add volunteering
          </Button>
        </div>
      )}
    </div>
  );
};

export default Volunteering;

const Form = ({ userData, setAddVolunteering }) => {
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
          <Label htmlFor="from">
            From<span className="text-red-500">*</span>
          </Label>
          <Input
            id="from"
            type="number"
            placeholder="2019"
            {...register("from", {
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
          <p className="text-xs text-red-500">{errors.from?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="to">
            To<span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            id="to"
            placeholder="2024"
            {...register("to", {
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
          <p className="text-xs text-red-500">{errors.to?.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Product Designer"
            {...register("title", {
              maxLength: {
                value: 20,
                message: "Name is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="client">
            Organization<span className="text-red-500">*</span>
          </Label>
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
      </div>
      <div className="flex items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="title">Location</Label>
          <Input
            id="title"
            placeholder="Where was it"
            {...register("title", {
              maxLength: {
                value: 20,
                message: "Name is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            {...register("url", {
              maxLength: {
                value: 20,
                message: "Name is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.url?.message}</p>
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
          <Droppable droppableId="characters" direction="horizontal">
            {(provided) => (
              <ul
                className="flex items-center gap-3 !mt-3"
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
                          className="flex items-center justify-between p-1 rounded-md border cursor-grab"
                        >
                          <div className="files-list-item-preview">
                            {preview.type === "image" ? (
                              <div className="relative">
                                <img
                                  className="w-28 rounded-md"
                                  src={preview.url}
                                />
                                <X
                                  className="absolute top-1 right-1 w-6 bg-white text-black h-6 border rounded-full p-1 cursor-pointer"
                                  onClick={() => handleFileRemove(id)}
                                />
                              </div>
                            ) : (
                              <div className="-list-item-preview-extension">
                                {extension}
                              </div>
                            )}
                          </div>
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
          className="rounded-sm"
          variant="secondary"
          onClick={() => setAddVolunteering(false)}
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
