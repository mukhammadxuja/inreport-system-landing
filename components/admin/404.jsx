import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";

function NotFound() {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            The page you are looking for does not exist. Here are some helpful
            links:
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <Button onClick={handleGoBack} variant="secondary">
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Go back</span>
            </Button>

            <Link href="/">
              <Button>
                <Home className="w-4 h-4 mr-2" />
                <span>Take me home</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
