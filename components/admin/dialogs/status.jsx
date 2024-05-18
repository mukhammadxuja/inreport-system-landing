/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";

// UI
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useApiContext } from "@/context/api-context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "sonner";
import { emojiPlus, emojis } from "@/utils/variables";
import { LoadingIcon } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

function StatusDialog({
  openStatus,
  setOpenStatus,
  children,
  selectedEmoji,
  setSelectedEmoji,
}) {
  const { userData, userUid } = useApiContext();

  const handleEmojiClick = (imgUrl) => {
    setSelectedEmoji(imgUrl);
  };

  const defaultValues = useMemo(() => {
    return {
      title: userData?.status?.title,
    };
  }, [userData]);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, setError, handleSubmit } = form;

  const { errors, isDirty, isSubmitting } = formState;

  const addStatus = async (data) => {
    if (!data.title) {
      setError("title", {
        type: "manual",
        message: "Select emoji before update",
      });
      return;
    }

    const docRef = doc(db, "users", userUid);
    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const gotUserData = docSnapshot.data();
        gotUserData["status"] = {
          ...data.stats,
          emoji: selectedEmoji,
          title: data.title,
        };
        await updateDoc(docRef, gotUserData);
      }
    } catch (error) {
      console.error("Error adding field to document:", error);
    } finally {
      setOpenStatus(false);
      toast(
        "Status updated successfully! Showing new status might take some minute"
      );
    }
  };

  return (
    <Dialog open={openStatus} onOpenChange={setOpenStatus}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 w-full">
          <div className="flex items-start gap-2">
            <Popover>
              <PopoverTrigger>
                <Image
                  width={24}
                  height={24}
                  src={
                    selectedEmoji
                      ? selectedEmoji
                      : userData?.status?.emoji || emojiPlus
                  }
                  alt="Fire emoji"
                  className="w-6 mt-1 h-auto object-contain"
                />
              </PopoverTrigger>
              <PopoverContent className="w-fit py-2 px-3" align="start">
                <ul className="grid grid-cols-6 gap-2">
                  {emojis.map((emoji, index) => (
                    <Image
                      key={index}
                      onClick={() => handleEmojiClick(emoji.img)}
                      width={20}
                      height={20}
                      loading="lazy"
                      src={emoji.img}
                      alt={emoji.title}
                      title={emoji.title}
                      className="w-6 h-6 cursor-pointer hover:scale-105 duration-200"
                    />
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
            <form
              onSubmit={handleSubmit(addStatus)}
              className="space-y-2 w-full"
              noValidate
            >
              <div className="space-y-1 w-full">
                <Input
                  id="title"
                  className="h-9"
                  defaultValue={defaultValues.title}
                  placeholder="Vocation"
                  {...register("title", {
                    required: {
                      value: true,
                      message: "Status title is required",
                    },
                    maxLength: {
                      value: 50,
                      message: "Status title is too long",
                    },
                  })}
                />
                <p className="text-xs text-red-500">{errors.title?.message}</p>
              </div>
              <div className="space-x-2 flex justify-end !mt-4">
                <Button
                  disabled={isSubmitting || !isDirty}
                  onClick={() => setOpenStatus(false)}
                  type="button"
                  size="sm"
                  className="rounded-sm"
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isSubmitting || (!isDirty && !selectedEmoji)}
                  size="sm"
                  className="rounded-sm"
                  type="submit"
                >
                  {isSubmitting && <LoadingIcon />}
                  {isSubmitting ? "Saving" : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default StatusDialog;
