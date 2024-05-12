"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import EmailVerificationAlert from "@/components/email-verification-alert";
import { updateUserAccount } from "@/firebase/auth/updateUserProfile";
import { useApiContext } from "@/context/api-context";
import { LoadingIcon } from "@/components/icons";

// Firebase
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth } from "@/firebase/config";

// UI
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";

const templates = [
  {
    value: "terra-nova",
    label: "Terra Nova",
  },
  {
    value: "professional-edge",
    label: "Professional Edge",
  },
  {
    value: "creative-spark",
    label: "Creative Spark",
  },
  {
    value: "modern-chic",
    label: "Modern Chic",
  },
  {
    value: "sleek-signature",
    label: "Sleek Signature",
  },
  {
    value: "elegant-essence",
    label: "Elegant Essence",
  },
  {
    value: "dynamic-fusion",
    label: "Dynamic Fusion",
  },
  {
    value: "bold-impact",
    label: "Bold Impact",
  },
  {
    value: "timeless-elegance",
    label: "Timeless Elegance",
  },
  {
    value: "stylish-spectrum",
    label: "Stylish Spectrum",
  },
  {
    value: "artistic-aura",
    label: "Artistic Aura",
  },
  {
    value: "sophisticated-style",
    label: "Sophisticated Style",
  },
  {
    value: "minimalist-magic",
    label: "Minimalist Magic",
  },
  {
    value: "vibrant-visions",
    label: "Vibrant Visions",
  },
  {
    value: "professional-polish",
    label: "Professional Polish",
  },
  {
    value: "innovative-insight",
    label: "Innovative Insight",
  },
  {
    value: "streamlined-showcase",
    label: "Streamlined Showcase",
  },
  {
    value: "creative-canvas",
    label: "Creative Canvas",
  },
  {
    value: "inspired-impact",
    label: "Inspired Impact",
  },
  {
    value: "versatile-visions",
    label: "Versatile Visions",
  },
  {
    value: "classic-charm",
    label: "Classic Charm",
  },
];

const General = () => {
  const { user, userData } = useApiContext();
  const hiddenFileInput = useRef(null);
  const [image, setImage] = useState(null);

  function removeFile() {
    hiddenFileInput.current.value = null;
    setImage(null);
  }
  const onChange = (e) => {
    const fileUploaded = e.target.files[0];
    if (!fileUploaded) return;
    setImage(fileUploaded);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={image ? URL.createObjectURL(image) : userData?.photoURL}
            alt={userData?.displayName}
          />
          <AvatarFallback>{userData?.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex items-center space-x-2 w-full overflow-hidden">
          <Button disabled={!image} onClick={removeFile} variant="secondary">
            Remove
          </Button>
          <form>
            <label htmlFor="photo" className="block">
              <input
                ref={hiddenFileInput}
                id="photo"
                type="file"
                accept="image/*"
                multiple
                onChange={onChange}
                className="block file:rounded-md file:text-sm file:font-medium file:ring-offset-background file:transition-colors file:focus-visible:outline-none file:focus-visible:ring-2 file:focus-visible:ring-ring file:focus-visible:ring-offset-2 file:disabled:pointer-events-none file:disabled:opacity-50 file:bg-primary file:text-primary-foreground file:hover:bg-primary/90 file:h-10 file:px-4 file:py-2"
              />
            </label>
          </form>
        </div>
      </div>
      <EmailVerificationAlert />
      <Separator />
      {user ? (
        <Form
          userData={userData}
          image={image}
          hiddenFileInput={hiddenFileInput}
        />
      ) : (
        <div className="max-w-2xl space-y-6 mt-5">
          <Skeleton className="h-10 space-y-1 w-full" />
          <Skeleton className="h-10 space-y-1 w-full" />
          <Skeleton className="h-10 space-y-1 w-full" />
          <Skeleton className="h-10 space-y-1 w-44" />
        </div>
      )}
    </div>
  );
};

export default General;

const Form = ({ userData, image, hiddenFileInput }) => {
  const [template, setTemplate] = useState("");

  const defaultValues = useMemo(() => {
    return {
      displayName: userData?.displayName,
      username: userData?.username ? userData.username : "",
      email: userData?.email ? userData.email : "",
      profession: userData?.profession ? userData.profession : "",
      location: userData?.location ? userData.location : "",
      website: userData?.website ? userData.website : "",
      bio: userData?.bio ? userData.bio : "",
    };
  }, [userData]);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, handleSubmit, reset } = form;

  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data) => {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `users/${auth.currentUser.email}/profile/${image?.name}`
    );

    // Upload the file
    await uploadBytes(storageRef, image);

    // Get download URL
    const photoURL = await getDownloadURL(storageRef);

    try {
      await updateUserAccount({ ...data, template }, photoURL);
    } catch (error) {
      console.log(error);
    } finally {
      toast("Profile updated successfully");
      hiddenFileInput.current.value = null;
    }
  };

  useEffect(() => {
    reset(userData);
  }, [reset, userData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="flex flex-col md:flex-row items-center w-full gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="username">
            Username<span className="text-red-500">*</span>
          </Label>
          <Input
            id="username"
            defaultValue={defaultValues.username}
            placeholder="Your unique @handle"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
              maxLength: {
                value: 20,
                message: "Username is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.username?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="displayName">
            Display Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="displayName"
            placeholder="How your displayName appears on your profile"
            {...register("displayName", {
              required: {
                value: true,
                message: "Display displayName is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.displayName?.message}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center w-full gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="profession">What do you do?</Label>
          <Input
            id="profession"
            placeholder="Architect, painter, etc"
            {...register("profession")}
          />
          <p className="text-xs text-red-500">{errors.profession?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Where you're based"
            {...register("location")}
          />
          <p className="text-xs text-red-500">{errors.location?.message}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start w-full gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            placeholder="https://example.com"
            {...register("website")}
          />
          <p className="text-xs text-red-500">{errors.website?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="template">Template</Label>
          <div className="flex items-center gap-2">
            <Combobox
              data={templates}
              templateValue={template}
              setTemplateValue={setTemplate}
              userTemplate={userData?.template}
            />
            {/* <Button
                type="button"
                className="whitespace-nowrap"
                variant="secondary"
              >
                Show templates
              </Button> */}
          </div>
          <a className="text-xs text-gray-600 cursor-pointer underline">
            Show templates
          </a>
        </div>
      </div>
      <div className="space-y-1 w-full">
        <Label htmlFor="bio">About</Label>
        <Textarea
          id="bio"
          rows={4}
          placeholder="A short bio"
          {...register("bio")}
        />
        <p className="text-xs text-red-500">{errors.bio?.message}</p>
      </div>
      <Separator />
      <div className="space-x-2 flex justify-end">
        <Button
          disabled={isSubmitting || !isDirty}
          onClick={() => reset()}
          className="rounded-sm"
          variant="secondary"
        >
          Reset
        </Button>
        <Button
          disabled={isSubmitting || (!isDirty && !image && !template)}
          className="rounded-sm"
          type="submit"
        >
          {isSubmitting && <LoadingIcon />}
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </div>
    </form>
  );
};
