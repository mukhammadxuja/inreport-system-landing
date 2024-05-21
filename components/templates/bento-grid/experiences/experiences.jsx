"use client";
import BentoGridExperienceItem from "./bento-grid-experience-item";

function BentoGridExperiences({ experiences, section }) {
  const visibleExperience = experiences.filter(
    (experience) => !experience.hide
  );

  return (
    <div className="p-4 md:p-6 bg-accent rounded-lg w-full">
      {!!experiences.length && (
        <div className="sticky top-0 z-50 py-2 bg-accent bg-opacity-20 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section>
        {visibleExperience.map((experience) => (
          <BentoGridExperienceItem
            key={experience.id}
            experience={experience}
          />
        ))}
      </section>
    </div>
  );
}

export default BentoGridExperiences;
