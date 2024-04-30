"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthContext } from "@/context/auth-context";
import { updateUserAccount } from "@/firebase/auth/updateUserProfle";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useMainContext } from "@/context/main-context";

const General = () => {
  const { user } = useAuthContext();
  const { users } = useMainContext();

  const userData = users.find((item) => item.uid === user.uid);

  return (
    <div className="">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.photoURL} alt={user.displayName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant="secondary">Remove</Button>
      </div>
      <Separator />
      {user ? (
        <Form userData={userData} />
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

const Form = ({ userData }) => {
  const defaultValues = useMemo(() => {
    return {
      name: userData?.displayName,
      username: userData?.username ? userData.username : "",
      email: userData?.email ? userData.email : "",
    };
  }, [userData]);
  console.log("defaultValues", defaultValues);

  const form = useForm({
    defaultValues: defaultValues,
  });

  const { register, formState, handleSubmit, setValue, reset, resetField } =
    form;

  const {
    errors,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
  } = formState;

  const onSubmit = async (data) => {
    console.log("Submitted Data:", data); // Log submitted data
    const { name, email } = data;
    const newData = { displayName: name, email };
    try {
      await updateUserAccount(newData);
      console.log("perfect");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    reset(userData);
  }, [reset]);

  console.log(userData);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="flex items-center w-full gap-3">
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
              maxLength: {
                value: 20,
                message: "Display name is long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.name?.message}</p>
        </div>
      </div>
      <div className="flex items-center w-full gap-3">
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
      <div className="flex items-center w-full gap-3">
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
          onClick={() => reset()}
          className="rounded-sm"
          variant="secondary"
        >
          Reset
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
      </div>
    </form>
  );
};
