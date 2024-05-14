import { useState } from "react";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ProjectItem from "../../profile/projects/project-item";

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
          <ProjectItem key={index} project={item} profile={false} />
        ))}
      </div>
    </div>
  );
}

export default ProjectList;
