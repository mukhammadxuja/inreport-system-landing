"use client";
import MinimalisticProjectItem from "./default-experience-item";

function MinimalisticExperiences({ experiences, section, activeSection }) {
  const visibleExperience = experiences.filter(
    (experience) => !experience.hide
  );

  return (
    <div id="experiences">
      {!!experiences.length && (
        <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10">
          <h4
            className={`minimalistic-template-item-title w-fit duration-500 ${
              activeSection === "experiences"
                ? "bg-lime-100 text-lime-500 opacity-100"
                : "bg-opacity-0"
            }`}
          >
            {section}
          </h4>
        </div>
      )}

      <section className="space-y-2 mt-4">
        {visibleExperience.map((experience) => (
          <MinimalisticProjectItem
            key={experience.id}
            experience={experience}
          />
        ))}
      </section>
    </div>
  );
}

export default MinimalisticExperiences;
