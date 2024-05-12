/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Image from "next/image";

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

function AddCertificationForm({ setAddCertification }) {
  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isSubmitting } = formState;

  const [isSending, setIsSending] = useState(false);
  const [notExpire, setNotExpire] = useState(false);
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

  // Add certification to database
  const addCertification = async (data) => {
    if (isSending) return;
    setIsSending(true);

    try {
      await addItem("certifications", { ...data, notExpire }, files).finally(
        () => {
          setAddCertification(false);
          setIsSending(false);
          toast("Certification added successfully");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addCertification)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="flex flex-col md:flex-row md:items-start gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="issued">
            Issued<span className="text-red-500">*</span>
          </Label>
          <Input
            id="issued"
            type="number"
            maxLength="4"
            placeholder="2019"
            {...register("issued", {
              required: {
                value: true,
                message: "Issued is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.issued?.message}</p>
        </div>

        <div className="space-y-1 w-full">
          <div className="space-y-1 w-full">
            <Label htmlFor="expires">
              Expires{!notExpire && <span className="text-red-500">*</span>}
            </Label>
            <Input
              disabled={notExpire}
              maxLength={4}
              type="number"
              id="expires"
              placeholder="2024"
              {...register("expires", {
                required: {
                  value: !notExpire,
                  message: "Expires is required",
                },
              })}
            />
            <p className="text-xs text-red-500">{errors.expires?.message}</p>
          </div>
          <div className="flex items-center space-x-1 w-fit">
            <Checkbox
              checked={notExpire}
              onCheckedChange={setNotExpire}
              className="rounded"
              id="notExpire"
              placeholder="2024"
              {...register("notExpire")}
            />
            <Label htmlFor="notExpire">Does not expire</Label>

            <p className="text-xs text-red-500">{errors.year?.message}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="My certification"
            {...register("name")}
          />
          <p className="text-xs text-red-500">{errors.name?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="organization">
            Organization<span className="text-red-500">*</span>
          </Label>
          <Input
            id="organization"
            placeholder="Acme inc."
            {...register("organization", {
              required: {
                value: true,
                message: "Organization is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.organization?.message}</p>
        </div>
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
      <div className="space-y-1 w-full">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Add some details, e.g. ID number"
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
          onClick={() => setAddCertification(false)}
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

export default AddCertificationForm;
