"use client";
import React, { useEffect } from "react";
import Sidebar from "../sidebar";
import { useApiContext } from "@/context/api-context";
import { useMainContext } from "@/context/main-context";
import Loading from "./loading";
import { useRouter } from "next/navigation";

function Dashboard({ children }) {
  const { user, loading } = useApiContext();
  const { openSidebar } = useMainContext();

  const router = useRouter();

  const ifSidebar = openSidebar
    ? "pl-[270px] duration-300 w-full"
    : "pl-0 md:pl-16 duration-300 w-full";

  return (
    <div className="flex">
      {/* {loading && <Loading />} */}
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
