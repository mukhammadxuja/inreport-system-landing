import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params }) {
  return {
    title:
      params.username[0].toUpperCase() +
      params.username.slice(1) +
      "'s Portfolio",
    description: params.username + "portfolio created by Showcase.ai",
  };
}

export default function AdminLayout({ children }) {
  return <div>{children}</div>;
}
