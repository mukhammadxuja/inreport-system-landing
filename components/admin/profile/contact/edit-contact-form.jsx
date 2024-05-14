"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useApiContext } from "@/context/api-context";

// Icons
import { LoadingIcon } from "@/components/icons";
import { X } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { handleFileRemove, updateItem } from "@/services/firestore-service";

function EditContactForm({ setIsEdit, editableId }) {
  const { contacts } = useApiContext();
  const contact = contacts.find((p) => p.id === editableId);

  const defaultValues = useMemo(() => {
    return {
      type: contact?.type,
      link: contact?.link,
    };
  }, [contact]);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, handleSubmit } = form;
  const { errors, isSubmitting } = formState;

  // Update contact to database
  const updateContact = async (data) => {
    try {
      await updateItem("contacts", data, editableId).finally(() => {
        setIsEdit(false);
        toast("Contact updated successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateContact)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
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
          onClick={() => setIsEdit(false)}
        >
          Cancel
        </Button>
        <Button disabled={isSubmitting} className="rounded-sm" type="submit">
          {isSubmitting && <LoadingIcon />}
          {isSubmitting ? "Saving" : "Save"}
          Edit
        </Button>
      </div>
    </form>
  );
}

export default EditContactForm;
