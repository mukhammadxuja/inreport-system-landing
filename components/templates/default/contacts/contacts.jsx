"use client";
import DefaultContactsItem from "./default-contacts-item";

function DefaultContacts({ contacts, section }) {
  const visibleContact = contacts.filter((contact) => !contact.hide);

  return (
    <div>
      <div className="sticky top-0 z-50 py-2 bg-white bg-opacity-50 backdrop-blur w-full">
        <h4 className="default-template-item-title">{section}</h4>
      </div>

      <section>
        {visibleContact.map((contact) => (
          <DefaultContactsItem key={contact.id} contact={contact} />
        ))}
      </section>
    </div>
  );
}

export default DefaultContacts;
