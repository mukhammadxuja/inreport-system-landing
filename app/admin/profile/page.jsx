import React from "react";
import EmailVerificationAlert from "../../../components/email-verification-alert";
import { Separator } from "@/components/ui/separator";
import { AlignJustify, Settings } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/profile/account";
import Banner from "@/components/profile/banner";
import Password from "@/components/profile/password";
// import Account from './Account';
// import Password from './Password';
// import ProfileMenu from "@/components//navbar/ProfileMenu";

function Profile() {
  return (
    <div className="px-4 md:px-6 py-5 mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <AlignJustify
              // onClick={() => setSidebar((prev) => !prev)}
              className="cursor-pointer h-5 mr-2 block md:hidden"
            />
            <h3 className="text-lg font-medium">Profile</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        {/* <ProfileMenu /> */}
      </div>
      <Separator className="my-4" />
      <EmailVerificationAlert />
      <Banner />
      <Tabs defaultValue="account" className="w-full mt-16">
        <TabsList className="grid max-w-2xl grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger disabled value="appearance">
            Appearance
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Account />
        </TabsContent>
        <TabsContent value="password">
          <Password />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Profile;
