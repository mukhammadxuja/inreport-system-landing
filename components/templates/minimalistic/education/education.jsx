"use client";
import MinimalisticEducationItem from "./default-education-item";

function MinimalisticEducation({ educations, section, activeSection }) {
  const visibleEducations = educations.filter((education) => !education.hide);

  return (
    <div id="educations">
      {!!educations.length && (
        <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10">
          <h4
            className={`minimalistic-template-item-title w-fit duration-500 ${
              activeSection === "educations"
                ? "bg-lime-100 text-lime-500 opacity-100"
                : "bg-opacity-0"
            }`}
          >
            {section}
          </h4>
        </div>
      )}

      <section className="space-y-2 mt-4">
        {visibleEducations.map((education) => (
          <MinimalisticEducationItem key={education.id} education={education} />
        ))}
      </section>
    </div>
  );
}

export default MinimalisticEducation;
