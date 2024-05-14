"use client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { addItem } from "@/services/firestore-service";

// Icons
import { LoadingIcon } from "@/components/icons";

// UI
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { Combobox } from "@/components/ui/combobox";
import { useState } from "react";

const values = [
  {
    value: "email",
    label: "Email",
  },
  {
    value: "telegram",
    label: "Telegram",
  },
];

function AddContactForm({ setAddContact }) {
  const form = useForm();
  const { register, formState, handleSubmit } = form;
  const { errors, isDirty, isSubmitting } = formState;

  // Add award to database
  const addContact = async (data) => {
    const itemDoc = doc(
      collection(db, `users/${auth.currentUser.uid}/contacts`)
    );

    try {
      await setDoc(itemDoc, {
        id: itemDoc.id,
        ...data,
        hide: false,
        timestamp: new Date().getTime(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      toast("Contact successfully");
      setAddContact(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(addContact)}
      noValidate
      className="space-y-3 md:space-y-6 mt-5"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="type">
            Link<span className="text-red-500">*</span>
          </Label>
          <Input
            id="type"
            placeholder="Email"
            {...register("type", {
              required: {
                value: true,
                message: "Link is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.type?.message}</p>
        </div>

        <div className="space-y-1 w-full">
          <Label htmlFor="link">
            Link<span className="text-red-500">*</span>
          </Label>
          <Input
            id="link"
            placeholder="example@gmail.com"
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
      <Separator />
      <div className="space-x-2 flex justify-end">
        <Button
          disabled={isSubmitting}
          className="rounded-sm"
          type="button"
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
          {isSubmitting && <LoadingIcon />}
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default AddContactForm;
