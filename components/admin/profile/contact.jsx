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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contacts = () => {
  const { user } = useAuthContext();

  const [addContact, setAddContact] = useState(false);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">Contact</h3>
        </div>
        <Button
          onClick={() => setAddContact(true)}
          className={addContact ? "hidden" : "block"}
          variant="secondary"
        >
          Add contact
        </Button>
      </div>
      <Separator />
      {addContact ? (
        <Form userData={user} setAddContact={setAddContact} />
      ) : (
        <div className="flex flex-col items-center justify-center !min-h-[calc(100vh-14rem)] py-10 space-y-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>

          <Button onClick={() => setAddContact(true)} variant="secondary">
            Add contact
          </Button>
        </div>
      )}
    </div>
  );
};

export default Contacts;

const Form = ({ userData, setAddContact }) => {
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

  const socialMediaOptions = [
    { value: "Are.na", label: "Are.na" },
    { value: "Dribbble", label: "Dribbble" },
    { value: "Email", label: "Email" },
    { value: "Facebook", label: "Facebook" },
    { value: "Figma", label: "Figma" },
    { value: "GitHub", label: "GitHub" },
    { value: "GitLab", label: "GitLab" },
    { value: "Honk", label: "Honk" },
    { value: "Instagram", label: "Instagram" },
    { value: "Itch", label: "Itch" },
    { value: "Letterboxd", label: "Letterboxd" },
    { value: "LinkedIn", label: "LinkedIn" },
    { value: "Substack", label: "Substack" },
    { value: "Telegram", label: "Telegram" },
    { value: "TikTok", label: "TikTok" },
    { value: "Tumblr", label: "Tumblr" },
    { value: "Twitch", label: "Twitch" },
    { value: "Twitter", label: "Twitter" },
    { value: "VSCO", label: "VSCO" },
    { value: "Vimeo", label: "Vimeo" },
    { value: "Website", label: "Website" },
    { value: "Youtube", label: "Youtube" },
    { value: "HORIZONTALRULE", label: "---", disabled: true },
    { value: "Custom", label: "Custom" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="flex items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="type">
            Type<span className="text-red-500">*</span>
          </Label>
          <Select id="type">
            <SelectTrigger>
              <SelectValue
                {...register("type", {
                  required: {
                    value: true,
                    message: "Type is required",
                  },
                  maxLength: {
                    value: 20,
                    message: "Type is too long",
                  },
                })}
                placeholder="Contacts"
              />
            </SelectTrigger>
            <SelectContent>
              {socialMediaOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-red-500">{errors.type?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="address">
            Address<span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            placeholder="url"
            {...register("address", {
              required: {
                value: true,
                message: "Address is required",
              },
            })}
          />
        </div>
      </div>
      <div className="space-x-2 flex justify-end">
        <Button
          className="rounded-sm"
          variant="secondary"
          onClick={() => setAddContact(false)}
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
