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

function FeedbackDialog({ userId, username, children }) {
  const [openFeedback, setOpenFeedback] = useState(false);

  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isSubmitting } = formState;

  // Add award to database
  const sendFeedback = async (data) => {
    const itemDoc = doc(collection(db, "feedbacks"));

    try {
      await setDoc(itemDoc, {
        id: itemDoc.id,
        ...data,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      toast("Thank you! Your feedback sended.");
      setOpenFeedback(false);
    }
  };

  return (
    <Dialog open={openFeedback} onOpenChange={setOpenFeedback}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form
          onSubmit={handleSubmit(sendFeedback)}
          noValidate
          className="space-y-3 md:space-y-6 mt-5"
        >
          <DialogHeader>
            <DialogTitle>Feedback</DialogTitle>
            <Separator />
            <DialogDescription className="!mt-2">
              <div className="space-y-1 w-full">
                <Label htmlFor="feedback">
                  Feedback<span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder="Your feedback about app."
                  {...register("feedback")}
                />
                <p className="text-xs text-red-500">
                  {errors.feedback?.message}
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
                onClick={() => setOpenFeedback(false)}
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

export default FeedbackDialog;
