"use client";
import BentoGridEducationItem from "./bento-grid-education-item";

function BentoGridEducation({ educations, section }) {
  const visibleEducations = educations
    .filter((education) => !education.hide)
    .sort((a, b) => parseInt(b.from) - parseInt(a.from));

  return (
    <div className="p-4 md:p-6 bg-accent rounded-lg w-full">
      {!!educations.length && (
        <div className="sticky top-0 z-50 py-2 bg-accent bg-opacity-50 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section>
        {visibleEducations.map((education) => (
          <BentoGridEducationItem key={education.id} education={education} />
        ))}
      </section>
    </div>
  );
}

export default BentoGridEducation;
