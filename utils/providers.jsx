"use client";
import { AuthContextProvider } from "@/context/auth-context";
function Providers({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}

export default Providers;
