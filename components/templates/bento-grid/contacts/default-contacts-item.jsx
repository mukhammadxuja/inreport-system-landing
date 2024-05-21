"use client";
import Link from "next/link";

function DefaultContactsItem({ contact }) {
  return (
    <div className="w-full">
      <Link href={`${contact?.link}`} target="_blank" rel="noopener noreferrer">
        <span>{contact.type}</span>
      </Link>
    </div>
  );
}

export default DefaultContactsItem;
