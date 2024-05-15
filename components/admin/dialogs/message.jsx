/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

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
import { Textarea } from "@/components/ui/textarea";
import { LoadingIcon } from "@/components/icons";
import { useForm } from "react-hook-form";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useApiContext } from "@/context/api-context";

function SendMessageDialog({ userId, username, children }) {
  const [openSendMessage, setOpenSendMessage] = useState(false);
  const { setUnreadMessages } = useApiContext();

  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isSubmitting } = formState;

  // Add award to database
  const sendMessage = async (data) => {
    if (!userUid) return;

    const itemDoc = doc(collection(db, "users", userId, "messages"));

    try {
      await setDoc(itemDoc, {
        id: itemDoc.id,
        ...data,
        read: false,
        timestamp: new Date().getTime(),
      });
      setUnreadMessages((prevCount) => prevCount + 1);
    } catch (error) {
      console.log(error);
    } finally {
      toast("Your message sended");
      setOpenSendMessage(false);
    }
  };

  return (
    <Dialog open={openSendMessage} onOpenChange={setOpenSendMessage}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(sendMessage)}
          noValidate
          className="space-y-3 md:space-y-6 mt-5"
        >
          <DialogHeader>
            <DialogTitle>New message</DialogTitle>
            <DialogDescription className="!mt-2">
              <Separator />
              <div className="space-y-1 w-full">
                <Label id="username">Your username</Label>
                <Input placeholder="Your username" {...register("username")} />
                <p className="text-xs text-red-500">
                  {errors.username?.message}
                </p>
              </div>
              <div className="space-y-1 w-full">
                <Label id="email">Your email</Label>
                <Input
                  type="email"
                  placeholder="Your email"
                  {...register("email")}
                />
              </div>
              <div className="space-y-1 w-full">
                <Label htmlFor="title">
                  Message<span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder={`Message to @${username}`}
                  {...register("message", {
                    required: {
                      value: true,
                      message: "Message is required",
                    },
                  })}
                />
                <p className="text-xs text-red-500">
                  {errors.message?.message}
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end gap-2">
            <DialogClose asChild>
              <Button
                disabled={isSubmitting}
                type="button"
                variant="secondary"
                onClick={() => setAddContact(false)}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting || !isDirty} type="submit">
              {isSubmitting && <LoadingIcon />}
              {isSubmitting ? "Sending" : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SendMessageDialog;
