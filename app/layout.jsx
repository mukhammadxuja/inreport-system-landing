import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import Providers from "@/utils/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sales automation software.",
  description:
    "Inreport - software for automating sales agents, sales department, cash register and warehouses. Wherever you are, Inreport shows you how your business is doing in real time and how much you're selling or making money right now.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.svg"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
