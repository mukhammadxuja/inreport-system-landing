"use client";
import React from "react";
import { useParams } from "next/navigation";

import dynamic from "next/dynamic"; // Import dynamic for Client Component
const UserProfileClient = dynamic(() => import("@/components/username")); // Import Client Component

function User() {
  const params = useParams();
  return (
    <div>
      {params.username}
      <UserProfileClient username={params.username} />
    </div>
  );
}

export default User;
