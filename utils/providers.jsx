"use client";
import { ApiContextProvider } from "@/context/api-context";
import { MainContextProvider } from "@/context/main-context";

function Providers({ children }) {
  return (
    <ApiContextProvider>
      <MainContextProvider>{children}</MainContextProvider>
    </ApiContextProvider>
  );
}

export default Providers;
