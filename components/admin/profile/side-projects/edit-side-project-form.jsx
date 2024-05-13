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

function EditSideProjectForm({ setIsEdit, editableId }) {
  const { sideProjects } = useApiContext();
  const project = sideProjects.find((p) => p.id === editableId);

  const [isSending, setIsSending] = useState(false);
  const [files, setFiles] = useState([]);
  const images = [...project.images];

  files.map((file) => {
    images.push({
      url: URL.createObjectURL(file),
      name: file.name,
      id: uuidv4(),
    });
  });

  const defaultValues = useMemo(() => {
    return {
      title: project?.title,
      year: project?.year,
      company: project?.company,
      link: project?.link,
      description: project?.description,
    };
  }, [project]);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, handleSubmit } = form;
  const { errors, isSubmitting } = formState;

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  // Update project to database
  const updateProject = async (data) => {
    if (isSending) return;
    setIsSending(true);

    try {
      await updateItem(
        "side-projects",
        data,
        editableId,
        files,
        project.images
      ).finally(() => {
        setIsEdit(false);
        setIsSending(false);
        toast("Project added successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateProject)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="title">
            Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="My Great Project"
            {...register("title", {
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.title?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="year">
            Year<span className="text-red-500">*</span>
          </Label>
          <Input
            type="number"
            id="year"
            placeholder="2024"
            {...register("year", {
              required: {
                value: true,
                message: "Year is required",
              },
              maxLength: {
                value: 4,
                message: "Year is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.year?.message}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="company">Company or client</Label>
          <Input
            id="company"
            placeholder="Acme inc."
            {...register("company", {
              required: {
                value: true,
                message: "Company name is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.company?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="link">Link to project</Label>
          <Input
            id="link"
            placeholder="https://example.com"
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
      <div className="space-y-1 w-full">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={4}
          placeholder="Cool project"
          {...register("description", {
            required: {
              value: true,
              message: "Name is required",
            },
            maxLength: {
              value: 300,
              message: "Description is too long (only 300)",
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
                          "side-projects",
                          name,
                          project.id,
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
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default EditSideProjectForm;
