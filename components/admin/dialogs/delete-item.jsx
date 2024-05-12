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
import { deleteItem } from "@/services/firestore-service";

function DeleteItem({ id, title, source, children }) {
  const [openDeleteItem, setOpenDeleteItem] = useState(false);

  return (
    <AlertDialog open={openDeleteItem} onOpenChange={setOpenDeleteItem}>
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
          <AlertDialogAction onClick={() => deleteItem(source, id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteItem;
