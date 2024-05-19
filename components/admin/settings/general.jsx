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
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

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

const Form = ({ userData }) => {
  const [hideMark, setHideMark] = useState();

  const settingsDocRef = doc(
    db,
    "users",
    auth.currentUser.uid,
    "settings",
    "settingsDoc"
  );

  useEffect(() => {
    const fetchSettings = async () => {
      const docSnap = await getDoc(settingsDocRef);
      if (docSnap.exists()) {
        setHideMark(docSnap.data().hideMark);
      }
    };

    fetchSettings();
  }, [settingsDocRef]);

  const onCheckedChange = async (newHideMarkValue) => {
    setHideMark(newHideMarkValue);

    try {
      await setDoc(
        settingsDocRef,
        { hideMark: newHideMarkValue }
        // { merge: true }
      );
      toast("Settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast("Failed to update settings");
    }
  };

  return (
    <div className="space-y-3 md:space-y-6 mt-5">
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">Allow send message</h6>
          <small className="setting-p">Everyone can message you</small>
        </div>
        <Checkbox defaultChecked className="h-5 w-5 rounded" />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">Hide mark</h6>
          <small className="setting-p">
            Hide in /{userData?.username} - build with showcase button
          </small>
        </div>
        <Switch
          checked={hideMark}
          onCheckedChange={onCheckedChange}
          // className="h-5 w-5 rounded accent-primary"
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">Appearance</h6>
          <small className="setting-p">Inherits OS dark mode</small>
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
          <h6 className="setting-title">{userData?.displayName}</h6>
          <small className="setting-p">Not you?</small>
        </div>
        <Button variant="secondary">Log out</Button>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">Invite friend</h6>
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
          <h6 className="setting-title">Email address</h6>
          <small className="setting-p">{userData?.email}</small>
        </div>
        <Button variant="secondary">Change</Button>
      </div>
      <Separator />
      <div className="w-full flex items-center justify-between">
        <div className="">
          <h6 className="setting-title">Account</h6>
          <small className="setting-p">Joined 3 months ago</small>
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
    </div>
  );
};
