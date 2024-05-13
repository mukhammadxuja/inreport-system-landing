"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useApiContext } from "@/context/api-context";
import { ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

function UserItem({ data, section, visibility, setVisibility }) {
  console.log(visibility);
  return (
    <div>
      {!!data.length && (
        <div className="flex items-center justify-between sticky top-0 z-20 py-2 bg-white bg-opacity-70 backdrop-blur-sm">
          <h4 className="text-base">{section}</h4>
          <Switch checked={visibility} onCheckedChange={setVisibility} />
        </div>
      )}
      <div className={!visibility && "blur-[1.5px]"}>
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-4 pr-4"
          >
            <di className="flex items-center space-x-1">
              <p>{item.year ? item.year : item.from}</p>
              <p>{item?.present ? " — Present" : item?.to}</p>
            </di>
            <div className="space-y-3 w-[25rem]">
              <div className="-space-y-1">
                <Button variant="linkHover1">
                  <Link
                    className="flex items-center space-x-1.5 group"
                    href={`${item.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      {item.title} at {item.company}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 -rotate-45 group-hover:rotate-0 duration-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                </Button>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
              <div className="flex items-center gap-3 overflow-x-scroll">
                {item.images && item.images.length > 0 && (
                  <div className="flex items-center gap-2">
                    {/* Map through images and render each */}
                    {item?.images?.map(({ url, id, name }) => (
                      <div key={id} className="w-32 rounded-md">
                        <Image
                          width={250}
                          height={150}
                          src={url ? url : "/assets/not-found.jpg"}
                          quality={80}
                          loading="lazy"
                          alt={name}
                          className={`w-full h-full object-cover rounded cursor-pointer`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserItem;
