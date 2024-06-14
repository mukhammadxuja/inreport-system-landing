"use client";
import React, { Fragment, useState } from "react";
// Context
import { useApiContext } from "@/context/api-context";
// Child Components
import EditSideProjectForm from "./edit-education-form";
import AddSideProjectForm from "./add-education-form";
import EmptyProjects from "./empty";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EducationItem from "./education-item";

/**
 * TODO:
 * Do another tabs like projects
 *
 * unique username - https://www.reddit.com/r/Firebase/comments/pvkv4d/unique_usernames_in_firebase/
 * Analytics - https://chatgpt.com/c/d7cb4d18-bb6c-47d9-99fc-93f9e5381b17
 *  FIXME:
 */

const Education = () => {
  const { user, educations } = useApiContext();

  const [addEducation, setAddEducation] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-3">
        <h3 className="tab-title">Education</h3>
        <Button
          onClick={() => setAddEducation(true)}
          className={addEducation || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add education
        </Button>
      </div>
      <Separator />
      {addEducation || isEdit ? (
        <Form
          userData={user}
          addEducation={addEducation}
          setAddEducation={setAddEducation}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editableId={editableId}
        />
      ) : (
        <Fragment>
          {educations.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              {educations
                .map((education) => (
                  <EducationItem
                    key={education.id}
                    education={education}
                    setEditableId={setEditableId}
                    setIsEdit={setIsEdit}
                  />
                ))
                .sort((a, b) => parseInt(b.from) - parseInt(a.from))}
            </div>
          ) : (
            <EmptyProjects setAddEducation={setAddEducation} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Education;

const Form = ({
  addEducation,
  setAddEducation,
  isEdit,
  setIsEdit,
  editableId,
}) => {
  return (
    <Fragment>
      {isEdit ? (
        <EditSideProjectForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addEducation ? (
        <AddSideProjectForm setAddEducation={setAddEducation} />
      ) : null}
    </Fragment>
  );
};
