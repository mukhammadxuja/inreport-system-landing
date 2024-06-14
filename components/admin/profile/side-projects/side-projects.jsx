"use client";
import React, { Fragment, useState } from "react";
// Context
import { useApiContext } from "@/context/api-context";
// Child Components
import SideProjectItem from "./side-project-item";
import EditSideProjectForm from "./edit-side-project-form";
import AddSideProjectForm from "./add-side-project-form";
import EmptyProjects from "./empty";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelpIcon } from "@/components/icons";

/**
 * TODO:
 * Do another tabs like projects
 *
 * unique username - https://www.reddit.com/r/Firebase/comments/pvkv4d/unique_usernames_in_firebase/
 * Analytics - https://chatgpt.com/c/d7cb4d18-bb6c-47d9-99fc-93f9e5381b17
 *  FIXME:
 */

const SideProjects = () => {
  const { user, sideProjects } = useApiContext();

  const [addProject, setAddProject] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");

  console.log("sideProjects", sideProjects);

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1.5">
          <h3 className="tab-title">Side Projects</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelpIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs text-center">
                  A hobby programming project that <br /> a developer builds
                  alongside their job.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          onClick={() => setAddProject(true)}
          className={addProject || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add side project
        </Button>
      </div>
      <Separator />
      {addProject || isEdit ? (
        <Form
          userData={user}
          addProject={addProject}
          setAddProject={setAddProject}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editableId={editableId}
        />
      ) : (
        <Fragment>
          {sideProjects.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              {sideProjects.map((project) => (
                <SideProjectItem
                  key={project.id}
                  project={project}
                  setEditableId={setEditableId}
                  setIsEdit={setIsEdit}
                />
              ))}
            </div>
          ) : (
            <EmptyProjects setAddProject={setAddProject} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default SideProjects;

const Form = ({ addProject, setAddProject, isEdit, setIsEdit, editableId }) => {
  return (
    <Fragment>
      {isEdit ? (
        <EditSideProjectForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addProject ? <AddSideProjectForm setAddProject={setAddProject} /> : null}
    </Fragment>
  );
};
