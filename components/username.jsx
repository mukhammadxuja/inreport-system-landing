/* eslint-disable @next/next/no-img-element */
import { useApiContext } from "@/context/api-context";
import { useMainContext } from "@/context/main-context";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsesIcon } from "@/components/icons";
import Link from "next/link";
import { Button } from "./ui/button";
import Loading from "./admin/loading";
import NotFound from "./admin/404";
// import NotFound from "@/app/not-found/page";

export default function UserProfileClient({ username }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [userNotFound, setUserNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const q = query(
        collection(db, "users"),
        where("username", "==", username)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  useEffect(() => {
    if (!userData) return; // Wait until userData is fetched

    const projectsCollection = collection(db, `users/${userData.uid}/projects`);

    const q = query(projectsCollection);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let projectsArr = [];

      querySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });

      setProjects(projectsArr);
    });

    return () => unsubscribe();
  }, [userData]);

  console.log("userData", userData);
  console.log("projects", projects);

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return <NotFound />;
  }

  return (
    <div className="px-4 min-h-screen max-w-3xl mx-auto my-20 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 !mt-6 md:!mt-10 w-full p-5 md:px-8 md:py-6 rounded-lg bg-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-24 w-24 rounded-full">
            <AvatarImage
              className="object-cover"
              src={userData?.photoURL || "/assets/avatars/1.png"}
              alt="@shadcn"
            />
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">
              {userData?.displayName ? userData?.displayName : "Unknown"}
            </h3>
            <Link
              className="text-sm underline text-gray-500"
              target="_blank"
              href={`/${userData?.username}`}
            >{`http://localhost:3000/${userData?.username}`}</Link>
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <EllipsesIcon />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-fit p-2">
            <Button variant="ghost" size="sm">
              Edit Profile
            </Button>
          </PopoverContent>
        </Popover>
      </div>

      {!!projects.length && <h4 className="text-sm">Projects</h4>}
      <div className="my-4">
        {projects.map((project) => (
          <div
            key={project.uid}
            className="flex items-start justify-between py-2 pl-2 pr-4 border-b"
          >
            <p>{project.year}</p>
            <div className="space-y-3 w-[25rem]">
              <div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center font-medium hover:underline cursor-pointer"
                >
                  {project.title} at {project.company}
                  <ChevronRight className="w-4 h-4" />
                </a>
                <p className="text-gray-500">{project.description}</p>
              </div>
              <div className="flex items-center gap-3 overflow-x-scroll">
                {project.images && project.images.length > 0 && (
                  <div className="flex items-center gap-2">
                    {/* Map through images and render each */}
                    {project.images.map(({ url, id, name }) => (
                      <div key={id} className="w-32 rounded-md">
                        <img
                          src={url}
                          alt={name}
                          className="w-full h-full object-cover rounded"
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
