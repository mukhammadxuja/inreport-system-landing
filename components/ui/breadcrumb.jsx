import { AlignJustify } from "lucide-react";
import React from "react";

function Breadcrumb() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center">
            <AlignJustify className="cursor-pointer h-5 mr-2 block md:hidden" />
            <h3 className="text-lg font-medium">Profile</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        {/* <ProfileMenu /> */}
      </div>
    </div>
  );
}

export default Breadcrumb;
