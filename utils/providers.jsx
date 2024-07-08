"use client";
import { MainContextProvider } from "@/context/main-context";

function Providers({ children }) {
  return <MainContextProvider>{children}</MainContextProvider>;
}

export default Providers;
