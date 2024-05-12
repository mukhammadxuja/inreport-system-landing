"use client";
import React, { Fragment, useState } from "react";
// Context
import { useApiContext } from "@/context/api-context";
// Child Components
import EditCertificationForm from "./edit-certification-form";
import AddCertificationForm from "./add-certification-form";
import CertificationItem from "./certification-item";
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

const Certifications = () => {
  const { user, certifications } = useApiContext();

  const [addCertification, setAddCertification] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-3">
        <h3 className="tab-title">Certification</h3>
        <Button
          onClick={() => setAddCertification(true)}
          className={addCertification || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add certification
        </Button>
      </div>
      <Separator />
      {addCertification || isEdit ? (
        <Form
          userData={user}
          addCertification={addCertification}
          setAddCertification={setAddCertification}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editableId={editableId}
        />
      ) : (
        <Fragment>
          {certifications.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              {certifications.map((certification) => (
                <CertificationItem
                  key={certification.id}
                  certification={certification}
                  setEditableId={setEditableId}
                  setIsEdit={setIsEdit}
                />
              ))}
            </div>
          ) : (
            <Empty setAddCertification={setAddCertification} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Certifications;

const Form = ({
  addCertification,
  setAddCertification,
  isEdit,
  setIsEdit,
  editableId,
}) => {
  return (
    <Fragment>
      {isEdit ? (
        <EditCertificationForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addCertification ? (
        <AddCertificationForm setAddCertification={setAddCertification} />
      ) : null}
    </Fragment>
  );
};
