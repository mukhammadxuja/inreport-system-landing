import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/utils/providers";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Showcase Your Talent, Achieve Greatness!",
  description:
    "Showcase Your Talent, Achieve Greatness! - Unleash your potential, connect with like-minded individuals, and gain the recognition you deserve. Join our vibrant community today!",
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
