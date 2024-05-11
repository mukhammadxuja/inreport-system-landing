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
import { auth } from "@/firebase/config";
import { moveDocToAnotherCollection } from "@/services/firestore-service";

function MoveProject({ id, projectName, from, to, children }) {
  const [openMoveProject, setOpenMoveProject] = useState(false);

  async function moveProjects({ projectId }) {
    await console.log(projectId);
  }

  return (
    <AlertDialog open={openMoveProject} onOpenChange={setOpenMoveProject}>
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
          <AlertDialogAction
            onClick={() =>
              moveDocToAnotherCollection(
                id,
                projectName,
                `users/${auth.currentUser.uid}/${from}`,
                `users/${auth.currentUser.uid}/${to}`
              )
            }
          >
            Move
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default MoveProject;
