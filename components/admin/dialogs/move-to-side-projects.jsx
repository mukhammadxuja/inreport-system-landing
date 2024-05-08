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

function MoveToSideProjects({ id, projectName, children }) {
  const [openMoveToSideProjects, setOpenMoveToSideProjects] = useState(false);

  async function moveProjects({ projectId }) {
    await console.log(projectId);
  }

  return (
    <AlertDialog
      open={openMoveToSideProjects}
      onOpenChange={setOpenMoveToSideProjects}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Move item</AlertDialogTitle>
          <AlertDialogDescription>
            {projectName} will be moved to your Side Projects.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => moveProjects(1)}>
            Move
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default MoveToSideProjects;
