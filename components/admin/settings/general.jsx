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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import InviteDialog from "../dialogs/invite";

const General = () => {
  const { userData } = useApiContext();

  const [addGeneral, setAddGeneral] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">General</h3>
        </div>
      </div>
      <Separator />
      <Form userData={userData} setAddGeneral={setAddGeneral} />
    </div>
  );
};

export default General;

const Form = ({ userData, setAddGeneral }) => {
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

  const { errors, isDirty, isSubmitting, isSubmitted, isSubmitSuccessful } =
    formState;

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
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">
            Allow send message
          </h6>
          <small className="setting-p">
            Everyone can message you
          </small>
        </div>
        <Checkbox defaultChecked className="h-5 w-5 rounded" />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">
            Hide mark
          </h6>
          <small className="setting-p">
            Hide in /{userData?.username} - build with showcase button
          </small>
        </div>
        <Checkbox className="h-5 w-5 rounded" />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">
            Appearance
          </h6>
          <small className="setting-p">
            Inherits OS dark mode
          </small>
        </div>
        <Select disabled>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Separator />
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">
            {userData?.displayName}
          </h6>
          <small className="setting-p">Not you?</small>
        </div>
        <Button variant="secondary">Log out</Button>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">
            Invite friend
          </h6>
          <small className="setting-p">Thank you ❤️</small>
        </div>
        <InviteDialog userData={userData}>
          <Button variant="secondary" className="flex items-center gap-1.5">
            <Image
              width={10}
              height={10}
              className="w-4 h-4 -ml-1"
              src="/assets/emojis/1.png"
              alt="love emoji"
            />
            <span>Invite</span>
          </Button>
        </InviteDialog>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">
            Email address
          </h6>
          <small className="setting-p">
            {userData?.email}
          </small>
        </div>
        <Button variant="secondary">Change</Button>
      </div>
      <Separator />
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">
            Account
          </h6>
          <small className="setting-p">
            Joined 3 months ago
          </small>
        </div>
        <Button variant="destructive">Delete</Button>
      </div>
      {/* <div className="space-y-1 w-full">
        <Label htmlFor="from">
          From<span className="text-red-500">*</span>
        </Label>
        <Select id="from">
          <SelectTrigger>
            <SelectValue
              {...register("from", {
                required: {
                  value: true,
                  message: "From is required",
                },
                maxLength: {
                  value: 20,
                  message: "From is too long",
                },
              })}
              placeholder="Generals"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-red-500">{errors.from?.message}</p>
      </div> */}
      {/* <Separator />
      <div className="space-x-2 flex justify-end">
        <Button
          className="rounded-sm"
          variant="secondary"
          onClick={() => setAddGeneral(false)}
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
      </div> */}
    </form>
  );
};
