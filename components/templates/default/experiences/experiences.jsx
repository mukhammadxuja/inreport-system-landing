"use client";
import DefaultProjectItem from "./default-experience-item";

function DefaultExperiences({ experiences, section }) {
  const visibleExperience = experiences.filter(
    (experience) => !experience.hide
  );

  return (
    <div>
      {!!experiences.length && (
        <div className="sticky top-0 z-50 py-2 bg-white bg-opacity-50 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section>
        {visibleExperience.map((experience) => (
          <DefaultProjectItem key={experience.id} experience={experience} />
        ))}
      </section>
    </div>
  );
}

export default DefaultExperiences;
