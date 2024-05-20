/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addItem } from "@/services/firestore-service";
import { MAX_FILE_SIZE } from "@/utils/variables";

// Icons
import { LoadingIcon } from "@/components/icons";
import { X } from "lucide-react";

// UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

function AddProjectForm({ setAddProject }) {
  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const [isSending, setIsSending] = useState(false);
  const [ongoing, setOngoing] = useState(false);
  const [files, setFiles] = useState([]);

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

  // Add project to database
  const addProject = async (data) => {
    if (isSending) return;
    setIsSending(true);

    try {
      await addItem("projects", { ...data, ongoing }, files).finally(() => {
        setAddProject(false);
        setIsSending(false);
        toast("Project added successfully");
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
      <div className="flex flex-col md:flex-row md:items-center gap-3">
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
          <div className="space-y-1 w-full">
            <Label htmlFor="year">
              Year{!ongoing && <span className="text-red-500">*</span>}
            </Label>
            <Input
              disabled={ongoing}
              maxLength={4}
              type="number"
              id="year"
              placeholder="2024"
              {...register("year", {
                required: {
                  value: !ongoing,
                  message: "Year is required",
                },
              })}
            />
            <p className="text-xs text-red-500">{errors.year?.message}</p>
          </div>
          <div className="flex items-center space-x-1 w-fit">
            <Checkbox
              checked={ongoing}
              onCheckedChange={setOngoing}
              className="rounded"
              id="ongoing"
            />
            <Label htmlFor="ongoing">Ongoing</Label>

            <p className="text-xs text-red-500">{errors.year?.message}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
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
                PNG, JPG or GIF (max. 5MG)
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
                className="grid grid-cols-1 md:grid-cols-2 gap-3 !mt-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {files.map((file, index) => {
                  if (file.size > MAX_FILE_SIZE) {
                    setFiles([]);
                    toast(`${file.name} exceeds the maximum file size of 5MB.`);
                    return null;
                  }

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
                              width={250}
                              height={150}
                              key={index}
                              src={URL.createObjectURL(file)}
                              loading="lazy"
                              alt={file.name}
                              className="w-16 h-16 md:w-32 md:h-24 object-cover rounded-sm cursor-pointer"
                            />
                            <div className="flex items-center font-medium w-full truncate">
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
          {isSubmitting && <LoadingIcon />}
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default AddProjectForm;
