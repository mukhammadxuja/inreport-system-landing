"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiContext } from "@/context/api-context";
import { updateUserAccount } from "@/firebase/auth/updateUserProfle";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Shell } from "lucide-react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { auth, db } from "@/firebase/config";
import { toast } from "sonner";

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

  console.log(userData);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={image ? URL.createObjectURL(image) : userData.photoURL}
            alt={user.displayName}
          />
          <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
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
  const defaultValues = useMemo(() => {
    return {
      displayName: userData?.displayName,
      username: userData?.username ? userData.username : "",
      email: userData?.email ? userData.email : "",
      profession: userData?.profession ? userData.profession : "",
      location: userData?.location ? userData.location : "",
      pronoun: userData?.pronoun ? userData.pronoun : "",
      website: userData?.website ? userData.website : "",
      bio: userData?.bio ? userData.bio : "",
    };
  }, [userData]);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, handleSubmit, reset } = form;

  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;

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
      await updateUserAccount(data, photoURL);
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
          <Label htmlFor="name">
            Display Name<span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="How your name appears on your profile"
            {...register("name", {
              required: {
                value: true,
                message: "Display name is required",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.name?.message}</p>
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
      <div className="flex flex-col md:flex-row items-center w-full gap-3">
        <div className="space-y-1 w-full">
          <Label htmlFor="pronoun">Pronouns</Label>
          <Input
            id="pronoun"
            placeholder="He/Him, etc"
            {...register("pronoun")}
          />
          <p className="text-xs text-red-500">{errors.pronoun?.message}</p>
        </div>
        <div className="space-y-1 w-full">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            placeholder="https://example.com"
            {...register("website")}
          />
          <p className="text-xs text-red-500">{errors.website?.message}</p>
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
          disabled={isSubmitting || !image}
          className="rounded-sm"
          type="submit"
        >
          {isSubmitting && <Shell className="animate-spin mr-2 h-4 w-4" />}
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </div>
    </form>
  );
};
