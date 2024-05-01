/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import { X } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

const Experience = () => {
  const { user } = useAuthContext();

  const [addExperience, setAddExperience] = useState(false);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            Experience
          </h3>
        </div>
        <Button
          onClick={() => setAddExperience(true)}
          className={addExperience ? "hidden" : "block"}
          variant="secondary"
        >
          Add experience
        </Button>
      </div>
      <Separator />
      {addExperience ? (
        <Form userData={user} setAddExperience={setAddExperience} />
      ) : (
        <div className="flex flex-col items-center justify-center !min-h-[calc(100vh-14rem)] py-10 space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
            stroke="currentColor"
            className="w-12 h-12 text-amber-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
            />
          </svg>

          <Button onClick={() => setAddExperience(true)} variant="secondary">
            Add experience
          </Button>
        </div>
      )}
    </div>
  );
};

export default Experience;

const Form = ({ userData, setAddExperience }) => {
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

  const [isSending, setIsSending] = useState(false);

  const saveExperience = async (data) => {
    if (isSending) return;
    setIsSending(true);

    try {
      const images = files.map((file) => ({
        id: file.id,
        extension: file.extension,
        sizeReadable: file.sizeReadable,
        preview: file.preview,
      }));

      await addDoc(
        collection(db, `users/${auth.currentUser.uid}/experiences`),
        {
          from: data.from,
          to: data.to,
          title: data.title,
          company: data.company,
          location: data.location,
          url: data.url,
          description: data.description,
          images: images,
          timestamp: new Date().getTime(),
        }
      ).finally(() => {
        setAddExperience(false);
        setIsSending(false);
        console.log("perfect");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(saveExperience)}
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
                message: "From is required",
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
                message: "To is required",
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
            {...register("title")}
          />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="company">
            Company or client<span className="text-red-500">*</span>
          </Label>
          <Input
            id="company"
            placeholder="Acme inc."
            {...register("company", {
              required: {
                value: true,
                message: "Company is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.company?.message}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Where was it"
            {...register("location")}
          />
          <p className="text-xs text-red-500">{errors.location?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            placeholder="https://example.com"
            {...register("url")}
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
            maxLength: {
              value: 200,
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
          onClick={() => setAddExperience(false)}
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
