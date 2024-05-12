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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { handleFileRemove, updateItem } from "@/services/firestore-service";
import { Checkbox } from "@/components/ui/checkbox";

function EditVolunteeringForm({ setIsEdit, editableId }) {
  const { volunteerings } = useApiContext();
  const volunteering = volunteerings.find((p) => p.id === editableId);

  const [isSending, setIsSending] = useState(false);
  const [present, setPresent] = useState(volunteering?.present);
  const [files, setFiles] = useState([]);
  const images = [...volunteering?.images];

  files.map((file) => {
    images.push({
      url: URL.createObjectURL(file),
      name: file.name,
      id: uuidv4(),
    });
  });

  const defaultValues = useMemo(() => {
    return {
      from: volunteering?.from,
      to: volunteering?.to,
      title: volunteering?.title,
      organization: volunteering?.organization,
      location: volunteering?.location,
      url: volunteering?.url,
      description: volunteering?.description,
    };
  }, [volunteering]);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, handleSubmit } = form;
  const { errors, isSubmitting } = formState;

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  // Update volunteering to database
  const updateEducation = async (data) => {
    if (isSending) return;
    setIsSending(true);

    try {
      await updateItem(
        "volunteerings",
        { ...data, present },
        editableId,
        files,
        volunteering.images
      ).finally(() => {
        setIsEdit(false);
        setIsSending(false);
        toast("Volunteering updated successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateEducation)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="from">
            From<span className="text-red-500">*</span>
          </Label>
          <Input
            id="from"
            type="number"
            placeholder="2019"
            {...register("from", {
              required: {
                value: true,
                message: "From is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.from?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <div className="space-y-1 w-full">
            <Label htmlFor="to">
              To<span className="text-red-500">*</span>
            </Label>
            <Input
              disabled={present}
              maxLength={4}
              type="number"
              id="to"
              placeholder="2024"
              {...register("to", {
                required: {
                  value: !present,
                  message: "To is required",
                },
              })}
            />
            <p className="text-xs text-red-500">{errors.to?.message}</p>
          </div>
          <div className="flex items-center space-x-1 w-fit">
            <Checkbox
              checked={present}
              onCheckedChange={setPresent}
              className="rounded"
              id="present"
              placeholder="2024"
            />
            <Label htmlFor="present">Present</Label>

            <p className="text-xs text-red-500">{errors.year?.message}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Product Designer"
            {...register("title")}
          />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
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
          <p className="text-xs text-red-500">{errors.company?.message}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Where was it"
            {...register("location")}
          />
          <p className="text-xs text-red-500">{errors.location?.message}</p>
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
      </div>
      <div className="space-y-1 w-full">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Cool volunteering"
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
                PNG, JPG or GIF (max. 800x400px)
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

        <div className="flex items-center gap-3">
          <ul className="flex flex-wrap items-center gap-3 !mt-3">
            {images.map(({ url, name, id }) => {
              return (
                <li
                  className="flex items-center justify-between p-1 rounded-md border"
                  key={id}
                >
                  <div className="relative">
                    <Image
                      width={250}
                      height={150}
                      src={url}
                      loading="lazy"
                      alt={name}
                      className="w-28 h-24 object-cover rounded-sm cursor-pointer"
                    />
                    <X
                      className="absolute top-1 right-1 w-6 bg-white text-black h-6 border rounded-full p-1 cursor-pointer"
                      onClick={() =>
                        handleFileRemove(
                          "volunteerings",
                          name,
                          volunteering.id,
                          id,
                          setFiles
                        )
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Separator />
      <div className="space-x-2 flex justify-end">
        <Button
          disabled={isSubmitting}
          className="rounded-sm"
          variant="secondary"
          onClick={() => setIsEdit(false)}
        >
          Cancel
        </Button>
        <Button disabled={isSubmitting} className="rounded-sm" type="submit">
          {isSubmitting && <LoadingIcon />}
          {isSubmitting ? "Updating" : "Update"}
        </Button>
      </div>
    </form>
  );
}

export default EditVolunteeringForm;