import React from "react";

import DefaultHeader from "./header";
import DefaultProjects from "./projects/projects";
import DefaultSideProjects from "./side-projects/side-projects";
import DefaultExperiences from "./experiences/experiences";
import DefaultVolunteering from "./volunteering/volunteering";
import DefaultEducation from "./education/education";
import DefaultCertification from "./certification/certification";
import DefaultAwards from "./awards/awards";
import DefaultContacts from "./contacts/contacts";

function DefaultHome({ data }) {
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
    <main className="px-4 max-w-3xl mx-auto my-20 !mt-6 md:!mt-10 w-full p-5 md:px-8 md:py-6 rounded-lg bg-white">
      <DefaultHeader userData={userData} />

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
