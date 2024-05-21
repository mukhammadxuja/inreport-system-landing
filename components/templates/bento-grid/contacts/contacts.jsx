"use client";
import DefaultContactsItem from "./default-contacts-item";

function DefaultContacts({ contacts, section }) {
  const visibleContact = contacts.filter((contact) => !contact.hide);

  return (
    <div className="p-4 md:p-6 bg-accent rounded-lg w-full">
      {!!contacts.length && (
        <div className="sticky top-0 z-50 py-2 bg-accent bg-opacity-50 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section className="flex items-center">
        {visibleContact.map((contact) => (
          <DefaultContactsItem key={contact.id} contact={contact} />
        ))}
      </section>
    </div>
  );
}

export default DefaultContacts;
