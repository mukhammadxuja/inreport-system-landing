"use client";
import MinimalisticContactsItem from "./default-contacts-item";

function MinimalisticContacts({ contacts, section, activeSection }) {
  const visibleContact = contacts.filter((contact) => !contact.hide);

  return (
    <div id="contacts">
      {!!contacts.length && (
        <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10">
          <h4
            className={`minimalistic-template-item-title w-fit duration-500 ${
              activeSection === "contacts"
                ? "bg-lime-100 text-lime-500 opacity-100"
                : "bg-opacity-0"
            }`}
          >
            {section}
          </h4>
        </div>
      )}

      <section className="space-y-2 mt-4">
        {visibleContact.map((contact) => (
          <MinimalisticContactsItem key={contact.id} contact={contact} />
        ))}
      </section>
    </div>
  );
}

export default MinimalisticContacts;
