"use client";
import DefaultProjectItem from "./default-awards-item";

function DefaultAwards({ awards, section }) {
  const visibleAwards = awards.filter((award) => !award.hide);

  return (
    <div className="p-4 md:p-6 bg-accent rounded-lg w-full">
      {!!awards.length && (
        <div className="sticky top-0 z-50 py-2 bg-accent bg-opacity-50 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section>
        {visibleAwards.map((award) => (
          <DefaultProjectItem key={award.id} award={award} />
        ))}
      </section>
    </div>
  );
}

export default DefaultAwards;