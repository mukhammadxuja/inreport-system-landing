"use client";
import React from "react";
import { NextSeo } from "next-seo";
import { useParams } from "next/navigation";

import dynamic from "next/dynamic";
const Join = dynamic(() => import("@/components/join/join"));

function User() {
  const params = useParams();
  return (
    <div>
      <NextSeo
        title="title"
        description="Then with a short description here."
      />
      <Join username={params.username} />
    </div>
  );
}

export default User;
