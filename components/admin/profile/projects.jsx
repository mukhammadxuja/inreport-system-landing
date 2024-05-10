"use client";
import React, { Fragment, useState } from "react";
// Context
import { useApiContext } from "@/context/api-context";
// Child Components
import ProjectItem from "./projects/project-item";
import EmptyProjects from "./projects/empty";
import AddProjectForm from "./projects/add-project-form";
import EditProjectForm from "./projects/edit-project-form";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

/**
 * TODO:
 * Loading and image lazy load
 * Refactor projects page (it should be last todo)
 *
 *
 * FEATURES
 * Move project to 'side projects'
 * Drag and drop project images
 *
 * unique username - https://www.reddit.com/r/Firebase/comments/pvkv4d/unique_usernames_in_firebase/
 * Analytics - https://chatgpt.com/c/d7cb4d18-bb6c-47d9-99fc-93f9e5381b17
 */

/**
 * FIXME:
 * Responsive
 */

const Projects = () => {
  const { user, projects } = useApiContext();

  const [addProject, setAddProject] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold leading-none tracking-tight">Projects</h3>
        <Button
          onClick={() => setAddProject(true)}
          className={addProject || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add project
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
          {projects.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              {projects.map((project) => (
                <ProjectItem
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

export default Projects;

const Form = ({ addProject, setAddProject, isEdit, setIsEdit, editableId }) => {
  return (
    <>
      {isEdit ? (
        <EditProjectForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addProject ? <AddProjectForm setAddProject={setAddProject} /> : null}
    </>
  );
};
