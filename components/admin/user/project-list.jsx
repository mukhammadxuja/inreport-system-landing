import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

/**
 * TODO:
 * HIDE FULL ITEM : EXAMPLE - PROJECTS HIDE
 */

function ProjectList({ data, section, visibility, setVisibility }) {
  return (
    <div>
      {!!data.length && (
        <div className="flex items-center justify-between sticky top-0 z-20 py-2 bg-white bg-opacity-70 backdrop-blur-sm">
          <h4 className="text-base">{section}</h4>
          <div className="flex items-center space-x-2">
            <Label htmlFor="visibility">Hide globally</Label>
            <Switch
              checked={visibility}
              onCheckedChange={setVisibility}
              id="visibility"
            />
          </div>
        </div>
      )}
      <div className={!visibility && "blur-[1.5px] cursor-not-allowed"}>
        {data.map((item, index) => (
          <div
            key={index}
            className="relative md:flex md:items-start md:justify-between py-4 pr-4"
          >
            <di className="hidden md:flex items-center space-x-1">
              <p>{item.year ? item.year : item.from}</p>
              <p>{item?.present ? " — Present" : item?.to}</p>
            </di>
            <div className="space-y-3 w-full md:w-[25rem]">
              <div className="-space-y-1">
                <div className="flex items-center justify-between w-full">
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
                  <p className="block md:hidden ml-auto">
                    {item.year ? item.year : item.from}
                  </p>
                </div>
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

export default ProjectList;
