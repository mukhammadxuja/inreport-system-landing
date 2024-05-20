import React from "react";

import DefaultHeader from "./header";
import ProjectList from "@/components/admin/user/projects/project-list";
import { useApiContext } from "@/context/api-context";
import DefaultProjects from "./projects/projects";
import DefaultSideProjects from "./side-projects/side-projects";
import DefaultExperiences from "./experiences/experiences";
import DefaultVolunteering from "./volunteering/volunteering";
import DefaultEducation from "./education/education";
import DefaultCertification from "./certification/certification";
import DefaultAwards from "./awards/awards";
import DefaultContacts from "./contacts/contacts";

function DefaultHome() {
  const {
    awards,
    projects,
    contacts,
    sideProjects,
    educations,
    experiences,
    volunteerings,
    certifications,
  } = useApiContext();

  return (
    <main>
      <DefaultHeader />

      <DefaultContacts contacts={contacts} section="Contacts" />

      <DefaultProjects projects={projects} section="Projects" />

      <DefaultSideProjects
        sideProjects={sideProjects}
        section="Side Projects"
      />

      <DefaultEducation educations={educations} section="Educations" />

      <DefaultExperiences
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

      <DefaultAwards awards={awards} section="Awards" />
    </main>
  );
}

export default DefaultHome;
