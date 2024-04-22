"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { updateUserPassword } from "@/firebase/auth/updatePassword";
// import { useToast } from '@/components/ui/use-toast';

const Password = ({ password }) => {
  // const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { register, formState, handleSubmit, reset, watch } = form;

  const { errors, isDirty, isSubmitting, isSubmitSuccessful } = formState;

  const onSubmit = async (data) => {
    try {
      await updateUserPassword(data.currentPassword, data.newPassword);
      console.log("perfect");
      // toast({
      //   title: 'Your password updated',
      // });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <h3 className="font-semibold leading-none tracking-tight">Password</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Make changes to your password here. Click save when you are done.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl space-y-3 md:space-y-6 mt-5"
        noValidate
      >
        <div className="space-y-1">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="Current password"
            {...register("currentPassword", {
              required: {
                value: true,
                message: "CurrentPassword is required",
              },
              minLength: {
                value: 6,
                message: "Current password is too short",
              },
              maxLength: {
                value: 20,
                message: "Current password is too long",
              },
              validate: (val) => {
                if (val !== password) {
                  return "Current password is wrong";
                }
              },
            })}
          />
          <p className="text-xs text-red-500">
            {errors.currentPassword?.message}
          </p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="New password"
            {...register("newPassword", {
              required: {
                value: true,
                message: "New password is required",
              },
              minLength: {
                value: 6,
                message: "New password is too short",
              },
              maxLength: {
                value: 20,
                message: "New password is too long",
              },
            })}
          />
          <p className="text-xs text-red-500">{errors.newPassword?.message}</p>
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmNewPassword">Confirm new password </Label>
          <Input
            id="confirmNewPassword"
            type="password"
            placeholder="Confirm new password "
            {...register("confirmNewPassword", {
              required: {
                value: true,
                message: "Confirm new password is required",
              },
              validate: (val) => {
                if (watch("newPassword") !== val) {
                  return "Your passwords do not match";
                }
              },
            })}
          />
          <p className="text-xs text-red-500">
            {errors.confirmNewPassword?.message}
          </p>
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
            Update password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Password;
