"use client";
import React, { useEffect } from "react";
import Sidebar from "../sidebar";
import { useAuthContext } from "@/context/auth-context";
import { useMainContext } from "@/context/main-context";
import Loading from "./loading";
import { useRouter } from "next/navigation";

function Dashboard({ children }) {
  const { user, loading } = useAuthContext();
  const { openSidebar } = useMainContext();

  const router = useRouter();

  console.log(loading);

  const ifSidebar = openSidebar
    ? "pl-[270px] duration-300 w-full"
    : "pl-16 duration-300 w-full";

  return (
    <div className="flex">
      {loading && <Loading />}
      {user && (
        <>
          <Sidebar />
          <div className={ifSidebar}>{children}</div>
        </>
      )}
    </div>
  );
}

export default Dashboard;