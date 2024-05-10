"use client";
import React from "react";
import { NextSeo } from "next-seo";
import { useParams } from "next/navigation";

import dynamic from "next/dynamic"; // Import dynamic for Client Component
const UserProfileClient = dynamic(() => import("@/components/username")); // Import Client Component

function User() {
  const params = useParams();
  return (
    <div>
      <NextSeo
        title="title"
        description="Then with a short description here."
      />
      <UserProfileClient username={params.username} />
    </div>
  );
}

export default User;
