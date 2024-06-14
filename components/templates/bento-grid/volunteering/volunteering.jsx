"use client";
import DefaultProjectItem from "./default-volunteering-item";

function DefaultVolunteering({ volunteerings, section }) {
  const visibleVolunteering = volunteerings
    .filter((volunteering) => !volunteering.hide)
    .sort((a, b) => parseInt(b.from) - parseInt(a.from));

  return (
    <div className="p-4 md:p-6 bg-accent rounded-lg w-full">
      {!!volunteerings.length && (
        <div className="sticky top-0 z-50 py-2 bg-accent bg-opacity-50 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section>
        {visibleVolunteering.map((volunteering) => (
          <DefaultProjectItem
            key={volunteering.id}
            volunteering={volunteering}
          />
        ))}
      </section>
    </div>
  );
}

export default DefaultVolunteering;
