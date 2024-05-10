"use client";
import React, { useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiContext } from "@/context/api-context";
import { updateUserAccount } from "@/firebase/auth/updateUserProfile";
// import { useToast } from "@/components/ui/use-toast";

const Account = () => {
  const { user } = useApiContext();
  return (
    <div className="">
      <h3 className="font-semibold leading-none tracking-tight">Account</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Make changes to your account here. Click save when you are done.
      </p>
      {user ? (
        <Form userData={user} />
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

export default Account;

const Form = ({ userData }) => {
  //   const { toast } = useToast();

  const defaultValues = useMemo(() => {
    return {
      name: userData?.displayName,
      // username: userData?.username ? userData.username : "",
      email: userData?.email ? userData.email : "",
    };
  }, [userData]);

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
    if (isSubmitSuccessful) {
      reset(defaultValues);
    }
  }, [isSubmitSuccessful, reset]);

  console.log(userData);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-3 md:space-y-6 mt-5"
      noValidate
    >
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="name"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
            maxLength: {
              value: 20,
              message: "Name is too long",
            },
          })}
        />
        <p className="text-xs text-red-500">{errors.name?.message}</p>
      </div>
      {/* <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="username"
          {...register("username", {
            maxLength: {
              value: 20,
              message: "username is too long",
            },
          })}
        />
        <p className="text-xs text-red-500">{errors.username?.message}</p>
      </div> */}
      <div className="space-y-1">
        <Label htmlFor="companyName">Email</Label>
        <Input
          id="companyName"
          placeholder="Email"
          {...register("email", {
            maxLength: { value: 40, message: "email is too long" },
          })}
        />
        <p className="text-xs text-red-500">{errors.email?.message}</p>
      </div>
      <div className="space-x-2 sm:flex">
        <Button
          disabled={isSubmitting || !isDirty}
          className="rounded-sm"
          variant="secondary"
          onClick={() => reset()}
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
          Update profile
        </Button>
      </div>
    </form>
  );
};
