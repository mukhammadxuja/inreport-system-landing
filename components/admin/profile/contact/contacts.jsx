"use client";
import React, { Fragment, useState } from "react";
// Context
import { useApiContext } from "@/context/api-context";
// Child Components
import EditContactForm from "./edit-contact-form";
import AddContactForm from "./add-contact-form";
import ContactItem from "./contact-item";
import EmptyContacts from "./empty";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Contacts = () => {
  const { userData, contacts } = useApiContext();

  const [addContact, setAddContact] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableId, setEditableId] = useState("");

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-3">
        <h3 className="tab-title">Contacts</h3>
        <Button
          onClick={() => setAddContact(true)}
          className={addContact || isEdit ? "hidden" : "block"}
          variant="secondary"
        >
          Add contact
        </Button>
      </div>
      <Separator />
      {addContact || isEdit ? (
        <Form
          userData={userData}
          addContact={addContact}
          setAddContact={setAddContact}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          editableId={editableId}
        />
      ) : (
        <Fragment>
          {contacts.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
              {contacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  setEditableId={setEditableId}
                  setIsEdit={setIsEdit}
                />
              ))}
            </div>
          ) : (
            <EmptyContacts setAddContact={setAddContact} />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Contacts;

const Form = ({ addContact, setAddContact, isEdit, setIsEdit, editableId }) => {
  return (
    <Fragment>
      {isEdit ? (
        <EditContactForm setIsEdit={setIsEdit} editableId={editableId} />
      ) : null}
      {addContact ? <AddContactForm setAddContact={setAddContact} /> : null}
    </Fragment>
  );
};
