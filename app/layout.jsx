import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/utils/providers";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "INREPORT - Sales automation software.",
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
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
