"use client";
import DefaultProjectItem from "./default-education-item";

function DefaultEducation({ educations, section }) {
  const visibleEducations = educations
    .filter((education) => !education.hide)
    .sort((a, b) => parseInt(b.from) - parseInt(a.from));

  return (
    <div>
      {!!educations.length && (
        <div className="sticky top-0 z-50 py-2 bg-white bg-opacity-50 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section>
        {visibleEducations.map((education) => (
          <DefaultProjectItem key={education.id} education={education} />
        ))}
      </section>
    </div>
  );
}

export default DefaultEducation;
