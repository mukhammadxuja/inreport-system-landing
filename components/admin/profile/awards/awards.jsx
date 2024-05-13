"use client";
import React, { Fragment, useState } from "react";
// Context
import { useApiContext } from "@/context/api-context";
// Child Components
import EditAwardForm from "./edit-awards-form";
import AddAwardForm from "./add-awards-form";
import AwardItem from "./award-item";
import EmptyAwards from "./empty";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/**
 * TODO:
 * Do another tabs like awards
 *
 * unique username - https://www.reddit.com/r/Firebase/comments/pvkv4d/unique_usernames_in_firebase/
 * Analytics - https://chatgpt.com/c/d7cb4d18-bb6c-47d9-99fc-93f9e5381b17
 *  FIXME:
 */

const Awards = () => {
  const { user, awards } = useApiContext();

  const [addAward, setAddAward] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-3">
        <h3 className="tab-title">Awards</h3>
        <Button
          onClick={() => setAddAward(true)}
          className={addAward || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add award
        </Button>
      </div>
      <Separator />
      {addAward || isEdit ? (
        <Form
          userData={user}
          addAward={addAward}
          setAddAward={setAddAward}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editableId={editableId}
        />
      ) : (
        <Fragment>
          {awards.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              {awards.map((award) => (
                <AwardItem
                  key={award.id}
                  award={award}
                  setEditableId={setEditableId}
                  setIsEdit={setIsEdit}
                />
              ))}
            </div>
          ) : (
            <EmptyAwards setAddAward={setAddAward} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Awards;

const Form = ({ addAward, setAddAward, isEdit, setIsEdit, editableId }) => {
  return (
    <Fragment>
      {isEdit ? (
        <EditAwardForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addAward ? <AddAwardForm setAddAward={setAddAward} /> : null}
    </Fragment>
  );
};
