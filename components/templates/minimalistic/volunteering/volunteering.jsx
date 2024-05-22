"use client";
import MinimalisticVolunteeringItem from "./default-volunteering-item";

function MinimalisticVolunteering({ volunteerings, section, activeSection }) {
  const visibleVolunteering = volunteerings.filter(
    (volunteering) => !volunteering.hide
  );

  return (
    <div id="volunteerings">
      {!!volunteerings.length && (
        <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10">
          <h4
            className={`minimalistic-template-item-title w-fit duration-500 ${
              activeSection === "volunteerings"
                ? "bg-lime-100 text-lime-500 opacity-100"
                : "bg-opacity-0"
            }`}
          >
            {section}
          </h4>
        </div>
      )}

      <section className="space-y-2 mt-4">
        {visibleVolunteering.map((volunteering) => (
          <MinimalisticVolunteeringItem
            key={volunteering.id}
            volunteering={volunteering}
          />
        ))}
      </section>
    </div>
  );
}

export default MinimalisticVolunteering;
