import React, { useEffect, useState } from "react";

import MinimalisticHeader from "./header";
import MinimalisticProjects from "./projects/projects";
import MinimalisticSideProjects from "./side-projects/side-projects";
import MinimalisticExperiences from "./experiences/experiences";
import MinimalisticVolunteering from "./volunteering/volunteering";
import MinimalisticEducation from "./education/education";
import MinimalisticCertification from "./certification/certification";
import MinimalisticAwards from "./awards/awards";
import MinimalisticContacts from "./contacts/contacts";
import MinimalisticNavbar from "./navbar";

function MinimalisticHome({ data, admin }) {
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

  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(section.getAttribute("id"));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setTimeout(() => {
        setActiveSection(null);
      }, 2000);
    }
  };

  return (
    <main
      className={`px-4 max-w-2xl bg-orange-200 mx-auto w-full p-5 md:p-0 rounded-lg ${
        admin ? "bg-white" : "bg-white my-20 mt-6 md:my-10 mb-20 md:!mb-28"
      }`}
    >
      <div className="fixed max-w-2xl bottom-0 left-1/2 -translate-x-1/2 z-[60] w-full h-10 bg-gradient-to-t from-lime-100 via-lime-100/40 to-transparent blur-md rounded-full"></div>
      <MinimalisticHeader userData={userData} admin={admin} />

      <MinimalisticNavbar data={data} scrollToSection={scrollToSection} />

      <MinimalisticExperiences
        experiences={experiences}
        section="Work Experiences"
        activeSection={activeSection}
      />

      <MinimalisticEducation
        educations={educations}
        section="Educations"
        activeSection={activeSection}
      />

      <MinimalisticProjects
        projects={projects}
        section="Projects"
        activeSection={activeSection}
      />

      <MinimalisticSideProjects
        sideProjects={sideProjects}
        section="Side Projects"
        activeSection={activeSection}
      />

      <MinimalisticCertification
        certifications={certifications}
        section="Certifications"
        activeSection={activeSection}
      />

      <MinimalisticAwards
        awards={awards}
        section="Awards"
        activeSection={activeSection}
      />

      <MinimalisticVolunteering
        volunteerings={volunteerings}
        section="Volunteerings"
        activeSection={activeSection}
      />

      <MinimalisticContacts
        contacts={contacts}
        section="Get in touch"
        activeSection={activeSection}
      />
    </main>
  );
}

export default MinimalisticHome;
