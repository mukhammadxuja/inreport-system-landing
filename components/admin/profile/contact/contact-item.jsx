"use client";
import React, { useState } from "react";
import { toggleHide } from "@/services/firestore-service";

// Icons
import { ChevronRight } from "lucide-react";

// Dialogs
import DeleteItem from "@/components/admin/dialogs/delete-item";

function ContactItem({ contact, setEditableId, setIsEdit }) {
  function handleEdit(id) {
    setEditableId(id);
    setIsEdit(true);
  }
  return (
    <div
      key={contact.id}
      className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 py-2 px-4 rounded-md border"
    >
      <p className="hidden md:block">{contact?.type}</p>
      <div className="col-span-2">
        <div className={`${contact?.hide && "blur-[1.5px]"}`}>
          <a
            href={`${contact.link}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center font-medium hover:underline cursor-pointer"
          >
            {contact.link}
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <small
              onClick={() => toggleHide("contacts", contact.id, contact.hide)}
              className="hover:underline cursor-pointer"
            >
              {contact?.hide ? "Show" : "Hide"}
            </small>
            <small
              onClick={() => handleEdit(contact.id)}
              className="hover:underline cursor-pointer"
            >
              Edit
            </small>
            <DeleteItem id={contact.id} title={contact.title} source="contacts">
              <small className="hover:underline cursor-pointer">Delete</small>
            </DeleteItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactItem;
