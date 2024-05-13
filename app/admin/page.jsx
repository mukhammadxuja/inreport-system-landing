"use client";
import { useState } from "react";
import EmailVerificationAlert from "@/components/email-verification-alert";
import { useApiContext } from "@/context/api-context";
import { ChevronRight, Pencil } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsesIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import Image from "next/image";
import { emojiPlus } from "@/utils/variables";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "sonner";
import StatusDialog from "@/components/admin/dialogs/status";

// TODO: refactor and make sure all function works before transfer to another file
// Hide, Edit, Delete, Active tab with localStorage
// Edit: https://codesandbox.io/p/sandbox/react-hooks-crud-firebase-z7nh3?file=%2Fsrc%2Ftables%2FUserTableRow.js%3A27%2C16-27%2C23

const emojis = [
  {
    title: "Smiling face with heart eyes",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2F1.png?alt=media&token=10366309-f896-4d0b-9530-c9ef9d92fc92",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2F2.png?alt=media&token=4c1ef762-a1f0-420b-9110-24cf024adeed",
    title: "Smiling face",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2F3.png?alt=media&token=7893ede0-7442-4d11-ac16-3cdfd8935bfa",
    title: "Neutral face",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2F4.png?alt=media&token=a39831d5-065e-44fe-8799-43f83fe02e9b",
    title: "Unhappy face",
  },
  {
    title: "Angry face",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fangry.png?alt=media&token=db3325f8-d127-4565-8aab-f97d49d62a26",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fcold-face.png?alt=media&token=f740df1b-b2a9-4e41-bf54-2366f11bca8b",
    title: "Cold face",
  },
  {
    title: "Grinning face",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fgrinning-face.png?alt=media&token=4cac21ca-d7cd-422e-84fc-05c81f8c6f06",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fzipper-mouth-face.png?alt=media&token=8225cb00-11bc-4bb9-8ad7-68eef130387a",
    title: "Zipper mouth face",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fnerd-face.png?alt=media&token=d732e5f1-f5e1-4886-9622-3651757e7f44",
    title: "Nerd face",
  },
  {
    title: "Thumbs up",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fthumbs-up.png?alt=media&token=6ff97599-e982-4e06-8b08-6e0f896df1a4",
  },
  {
    title: "Thumbs down",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fthumbs-down.png?alt=media&token=3971dafe-3876-4028-b711-607f52ff3204",
  },
  {
    title: "Biceps",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fbiceps.png?alt=media&token=acd3615d-c936-4444-bfdb-6f86e8ba3942",
  },
  {
    title: "Unicorn",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Funicorn.png?alt=media&token=f4932d89-4950-457e-9078-6dedd86a3a92",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Ffrog.png?alt=media&token=449bc479-0df0-40b9-8c4c-b985b1eb8293",
    title: "Frog",
  },
  {
    title: "Turtle",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fturtle.png?alt=media&token=5e815f52-f95f-40e2-8cf1-2afd2ad02eed",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fwhale.png?alt=media&token=435a31f5-b3fe-4d38-9984-48052034e1e3",
    title: "Whale",
  },
  {
    title: "Bee",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fbee.png?alt=media&token=0c660b75-0880-4ff6-893a-0003100dacee",
  },
  {
    title: "Crocodile",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fcrocodile.png?alt=media&token=ec966fc0-0440-43c6-bed2-c9540753ba74",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fgrapes.png?alt=media&token=5b80fa08-ca7c-4262-8b1f-2f3e7ddfdb91",
    title: "Grapes",
  },
  {
    title: "Strawberry",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fstrawberry.png?alt=media&token=4b42b076-d2f8-4272-82f5-c7524e0f92ef",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fkiwi.png?alt=media&token=f589aacc-3162-4e6c-8406-22f0d7b59fb1",
    title: "Kiwi",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Favacado.png?alt=media&token=5a922094-6768-4b6d-bbe1-9b4b08224e09",
    title: "Avocado",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fbroccoli.png?alt=media&token=28515d17-1f7a-4666-bbcc-da13338934cc",
    title: "Broccoli",
  },
  {
    title: "Meat",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fmeat.png?alt=media&token=a23214fa-f36b-49a3-9283-53035e58a447",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Ffootball-ball.png?alt=media&token=b7df8c61-5567-4c77-801d-013efd23c499",
    title: "Football ball",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fbasketball-ball.png?alt=media&token=7be548bc-29fc-4d3c-a1b3-2f6540f07e9f",
    title: "basketball ball",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fsoftballball.png?alt=media&token=31d1a0cb-3481-4d54-8d1f-5bf05ed07a9f",
    title: "Softball ball",
  },
  {
    title: "Tennis ball",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Ftennis-ball.png?alt=media&token=eb603218-18e2-4128-b652-214fc8220446",
  },
  {
    title: "American football ball",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Famerican-football-ball.png?alt=media&token=9cd0921b-4414-44f6-b489-4445c1feff9d",
  },
  {
    title: "Baseball ball",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fbaseball-ball.png?alt=media&token=1bc59323-3e68-4055-9cb2-26559b0eaed0",
  },
  {
    title: "Focus",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Ffocus.png?alt=media&token=f6a35a69-dbde-4887-b29f-f74c5f64406f",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Ftime.png?alt=media&token=1683165b-c20f-410a-8920-0f8ac5211c24",
    title: "Time",
  },
  {
    title: "Vocation",
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fvocation.png?alt=media&token=801fe825-ea4f-47e8-946b-d97175f0496d",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fhome.png?alt=media&token=3382f37a-7a31-4d64-9d90-4d14a3071093",
    title: "Home",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fearth.png?alt=media&token=d06aac5a-0eba-4e6c-aeb7-0b9289b24dac",
    title: "Earth",
  },
  {
    img: "https://firebasestorage.googleapis.com/v0/b/showcaseai-75e82.appspot.com/o/emojis%2Fpill.png?alt=media&token=4aa5872e-08a3-4d72-8cfa-c8c0168709b6",
    title: "Pill",
  },
];

function AdminPage() {
  const { projects, userData, userUid } = useApiContext();
  const [projectsVisible, setProjectsVisible] = useState(true);
  const [openStatus, setOpenStatus] = useState(false);
  const [statusTitle, setStatusTitle] = useState(userData?.status?.title);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiClick = (imgUrl) => {
    setSelectedEmoji(imgUrl);
  };

  console.log(statusTitle);

  const addFieldToDocument = async () => {
    const docRef = doc(db, "users", userUid);

    try {
      // Fetch the document
      const docSnapshot = await getDoc(docRef);

      // Check if the document exists
      if (docSnapshot.exists()) {
        // Get the data of the document
        const data = docSnapshot.data();

        // Update the data with the new field
        data["status"] = { emoji: selectedEmoji, title: statusTitle };

        // Update the document in Firestore
        await updateDoc(docRef, data);

        setStatusTitle(statusTitle);

        toast("Status updated successfully");
      }
    } catch (error) {
      console.error("Error adding field to document:", error);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto min-h-screen">
        <EmailVerificationAlert />
        <div className="px-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full p-5 md:px-8 md:py-6 rounded-lg bg-white">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative w-fit">
                <Avatar className="h-24 w-24 rounded-full">
                  <AvatarImage
                    className="object-cover"
                    src={userData?.photoURL || "/assets/avatars/unknown.jpg"}
                    alt="@shadcn"
                  />
                </Avatar>
              </div>
              <div className="">
                <h3 className="text-xl font-semibold">
                  {userData?.displayName ? userData?.displayName : "Unknown"}
                </h3>
                <p>
                  {userData?.profession
                    ? userData?.profession
                    : "Unknown Profession"}
                </p>
                <StatusDialog
                  openStatus={openStatus}
                  setOpenStatus={setOpenStatus}
                >
                  <div className="w-fit flex items-center gap-1 py-1 px-2 rounded-full bg-indigo-100 shadow-sm cursor-pointer group">
                    <Image
                      width={20}
                      height={20}
                      src={
                        selectedEmoji
                          ? selectedEmoji
                          : userData?.status?.emoji || emojiPlus
                      }
                      alt="Fire emoji"
                      className="w-5 h-5"
                    />
                    <small className="text-xs pr-1">
                      {userData?.status?.title}
                    </small>
                  </div>
                </StatusDialog>
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

          {!!projects.length && (
            <div className="flex items-center justify-between">
              <h4 className="text-sm">Projects</h4>
              <Switch
                checked={projectsVisible}
                onCheckedChange={setProjectsVisible}
              />
            </div>
          )}
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
      </div>
      <Link className="fixed bottom-4 right-4" href="/admin/profile">
        <Button
          variant="secondary"
          className="flex items-center bg-white shadow-lg gap-2"
        >
          <Pencil className="w-4 h-4" />
          <span className="text-sm">Edit Profile</span>
        </Button>
      </Link>
    </div>
  );
}

export default AdminPage;
