"use client";
import React from "react";
import Sidebar from "./sidebar";
import { useAuthContext } from "@/context/auth-context";
import { useMainContext } from "@/context/main-context";

function Dashboard({ children }) {
  const { user } = useAuthContext();
  const { openSidebar } = useMainContext();

  return (
    <div className="flex">
      {user && <Sidebar />}
      <main
        className={
          openSidebar
            ? "pl-[260px] duration-300 w-full"
            : "pl-14 duration-300 w-full"
        }
      >
        {children}
      </main>
    </div>
  );
}

export default Dashboard;
