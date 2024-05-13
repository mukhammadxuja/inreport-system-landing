/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";

// UI
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useApiContext } from "@/context/api-context";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { toast } from "sonner";
import { emojiPlus } from "@/utils/variables";
import { LoadingIcon } from "@/components/icons";

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

function StatusDialog({ openStatus, setOpenStatus, children, selectedEmoji, setSelectedEmoji }) {
  const { userData, userUid } = useApiContext();

  const [statusTitle, setStatusTitle] = useState(userData?.status?.title);

  const [isSending, setIsSending] = useState(false);

  const handleEmojiClick = (imgUrl) => {
    setSelectedEmoji(imgUrl);
  };

  const addFieldToDocument = async () => {
    setIsSending(true);

    if (!selectedEmoji && !statusTitle) {
      setIsSending(false);
      toast("Emoji or Status title empty");
      return;
    }

    const docRef = doc(db, "users", userUid);
    try {
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        data["status"] = { emoji: selectedEmoji, title: statusTitle };
        await updateDoc(docRef, data);
      }
    } catch (error) {
      console.error("Error adding field to document:", error);
    } finally {
      setOpenStatus(false);
      toast("Status updated successfully");
      setIsSending(false);
    }
  };

  return (
    <Dialog open={openStatus} onOpenChange={setOpenStatus}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 w-full">
          <div className="flex items-center gap-1.5">
            <Popover>
              <PopoverTrigger>
                <Image
                  width={24}
                  height={24}
                  src={
                    selectedEmoji
                      ? selectedEmoji
                      : userData?.status?.emoji || emojiPlus
                  }
                  alt="Fire emoji"
                  className="w-7 h-auto object-contain"
                />
              </PopoverTrigger>
              <PopoverContent className="w-fit py-2 px-3" align="start">
                <ul className="grid grid-cols-6 gap-2">
                  {emojis.map((emoji, index) => (
                    <Image
                      key={index}
                      onClick={() => handleEmojiClick(emoji.img)}
                      width={20}
                      height={20}
                      loading="lazy"
                      src={emoji.img}
                      alt={emoji.title}
                      title={emoji.title}
                      className="w-6 h-6 cursor-pointer hover:scale-105 duration-200"
                    />
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <Input
              className="h-10 w-full"
              value={statusTitle}
              onChange={(e) => setStatusTitle(e.target.value)}
              placeholder="Your statusTitle"
            />
          </div>
        </div>
        <DialogFooter>
          <div className="space-x-2 flex justify-end">
            <Button
              onClick={() => setOpenStatus(false)}
              size="sm"
              className="rounded-sm"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={addFieldToDocument}
              size="sm"
              disabled={isSending}
              type="submit"
            >
              {isSending && <LoadingIcon />}
              {isSending ? "Updating" : "Set status"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default StatusDialog;