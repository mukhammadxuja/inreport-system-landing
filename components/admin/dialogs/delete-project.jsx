"use client";
import React, { useState } from "react";

// UI
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { db } from "@/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { useApiContext } from "@/context/api-context";

function DeleteProject({ id, title, children }) {
  const { userUid } = useApiContext();
  const [openDeleteProject, setOpenDeleteProject] = useState(false);

  const deleteProject = async () => {
    await deleteDoc(doc(db, `users/${userUid}/projects`, id));
  };

  return (
    <AlertDialog open={openDeleteProject} onOpenChange={setOpenDeleteProject}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete item</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {title}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteProject}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProject;
