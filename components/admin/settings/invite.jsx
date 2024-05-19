"use client";
import React, { useState } from "react";
import { useApiContext } from "@/context/api-context";

// UI
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

import { CheckCircle, CheckCircle2, Circle, Loader } from "lucide-react";

const Invite = () => {
  const { userData } = useApiContext();
  const [invitedFriends, setInvitedFriends] = useState(0);
  const [copy, setCopy] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`localhost:3000/join/${userData?.username}`);
    setCopy(true);
    setTimeout(() => setCopy(false), 3000);
  };

  return (
    <div>
      <h3 className="font-semibold leading-none tracking-tight mb-3">
        Invite your first friend!
      </h3>
      <Separator />
      <div className="!mt-4 space-y-3">
        <div className="flex items-center gap-2">
          <Input
            className="outline-none ring-0"
            value={`https://localhost:3000/join/${userData?.username}`}
          />
          <Button onClick={copyToClipboard} variant="secondary">
            {copy ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between rounded-lg p-4 border gap-2">
          <div>
            <h5 className="text-base font-medium leading-none tracking-tight">
              10 invites
            </h5>
            <p className="text-sm text-gray-500">
              Invite your friend get all templates for free.
            </p>
          </div>
          <span className="flex items-center gap-2">
            <small>{invitedFriends.toString()[0]}/10</small>
            <Progress className="w-full md:w-44" value={invitedFriends} />
            {invitedFriends === 100 ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            ) : (
              <Loader className="w-5 h-5 opacity-50" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Invite;
