import { Inter } from "next/font/google";

import "./globals.css";
import Providers from "@/utils/providers";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "INREPORT - Savdo boshqaruvi platformasi.",
  description:
    "INREPORT - Savdo boshqaruvi platformasi. Biznesingizni yangi bosqichga olib chiqing. INREPORT bilan savdolarni avtomatlashtirish, mijozlarni boshqarish, inventarizatsiyani kuzatish va moliyaviy hisobotlarni tahlil qilishni amalga oshiring.",
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
