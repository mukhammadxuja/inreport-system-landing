"use client";
import React, { Fragment, useState } from "react";
// Context
import { useApiContext } from "@/context/api-context";
// Child Components
import SideProjectItem from "./experience-item";
import EditSideProjectForm from "./edit-experience-form";
import AddSideProjectForm from "./add-experience-form";
import EmptyProjects from "./empty";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ExperienceItem from "./experience-item";

/**
 * TODO:
 * Do another tabs like projects
 *
 * unique username - https://www.reddit.com/r/Firebase/comments/pvkv4d/unique_usernames_in_firebase/
 * Analytics - https://chatgpt.com/c/d7cb4d18-bb6c-47d9-99fc-93f9e5381b17
 *  FIXME:
 */

const Experience = () => {
  const { user, experiences } = useApiContext();

  const [addExperience, setAddExperience] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-3">
        <h3 className="tab-title">Experience</h3>
        <Button
          onClick={() => setAddExperience(true)}
          className={addExperience || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add experience
        </Button>
      </div>
      <Separator />
      {addExperience || isEdit ? (
        <Form
          userData={user}
          addExperience={addExperience}
          setAddExperience={setAddExperience}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editableId={editableId}
        />
      ) : (
        <Fragment>
          {experiences.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              {experiences.map((experience) => (
                <ExperienceItem
                  key={experience.id}
                  experience={experience}
                  setEditableId={setEditableId}
                  setIsEdit={setIsEdit}
                />
              ))}
            </div>
          ) : (
            <EmptyProjects setAddExperience={setAddExperience} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Experience;

const Form = ({
  addExperience,
  setAddExperience,
  isEdit,
  setIsEdit,
  editableId,
}) => {
  return (
    <Fragment>
      {isEdit ? (
        <EditSideProjectForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addExperience ? (
        <AddSideProjectForm setAddExperience={setAddExperience} />
      ) : null}
    </Fragment>
  );
};
