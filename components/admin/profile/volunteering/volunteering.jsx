"use client";
import React, { Fragment, useState } from "react";
// Context
import { useApiContext } from "@/context/api-context";
// Child Components
import EditVolunteeringForm from "./edit-volunteering-form";
import AddVolunteeringForm from "./add-volunteering-form";
import VolunteeringItem from "./volunteering-item";
import Empty from "./empty";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * TODO:
 * Do another tabs like projects
 *
 * unique username - https://www.reddit.com/r/Firebase/comments/pvkv4d/unique_usernames_in_firebase/
 * Analytics - https://chatgpt.com/c/d7cb4d18-bb6c-47d9-99fc-93f9e5381b17
 *  FIXME:
 */

const Volunteering = () => {
  const { user, volunteerings } = useApiContext();

  const [addVolunteering, setAddVolunteering] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-3">
        <h3 className="tab-title">Volunteering</h3>
        <Button
          onClick={() => setAddVolunteering(true)}
          className={addVolunteering || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add volunteering
        </Button>
      </div>
      <Separator />
      {addVolunteering || isEdit ? (
        <Form
          userData={user}
          addVolunteering={addVolunteering}
          setAddVolunteering={setAddVolunteering}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editableId={editableId}
        />
      ) : (
        <Fragment>
          {volunteerings.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              {volunteerings.map((volunteering) => (
                <VolunteeringItem
                  key={volunteering.id}
                  volunteering={volunteering}
                  setEditableId={setEditableId}
                  setIsEdit={setIsEdit}
                />
              ))}
            </div>
          ) : (
            <Empty setAddVolunteering={setAddVolunteering} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Volunteering;

const Form = ({
  addVolunteering,
  setAddVolunteering,
  isEdit,
  setIsEdit,
  editableId,
}) => {
  return (
    <Fragment>
      {isEdit ? (
        <EditVolunteeringForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addVolunteering ? (
        <AddVolunteeringForm setAddVolunteering={setAddVolunteering} />
      ) : null}
    </Fragment>
  );
};
