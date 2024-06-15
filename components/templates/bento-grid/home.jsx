import React from "react";

import DefaultHeader from "./header";
import { useApiContext } from "@/context/api-context";
import DefaultProjects from "./projects/projects";
import DefaultSideProjects from "./side-projects/side-projects";
import DefaultVolunteering from "./volunteering/volunteering";
import DefaultCertification from "./certification/certification";
import DefaultAwards from "./awards/awards";
import DefaultContacts from "./contacts/contacts";
import BentoGridExperiences from "./experiences/experiences";
import BentoGridEducation from "./education/education";
import BentoGridFooter from "./footer";

function BentoGridHome({ data }) {
  const {
    userData,
    awards,
    projects,
    contacts,
    sideProjects,
    educations,
    experiences,
    volunteerings,
    certifications,
  } = data;

  return (
    <main className="px-10 lg:px-0 max-w-[76.5rem] mx-auto my-5 w-full">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="space-y-4 w-full">
          <DefaultHeader userData={userData} />
          <DefaultProjects projects={projects} section="Projects" />

          <DefaultAwards awards={awards} section="Awards" />


          <DefaultSideProjects
            sideProjects={sideProjects}
            section="Side Projects"
          />

          <DefaultContacts contacts={contacts} section="Contacts" />
        </div>

        <div className="space-y-4 w-full">
          <BentoGridEducation educations={educations} section="Educations" />

          <BentoGridExperiences
            experiences={experiences}
            section="Work Experiences"
          />

          <DefaultCertification
            certifications={certifications}
            section="Certifications"
          />

          <DefaultVolunteering
            volunteerings={volunteerings}
            section="Volunteerings"
          />
        </div>
      </div>

      <BentoGridFooter userData={userData} />
    </main>
  );
}

export default BentoGridHome;
