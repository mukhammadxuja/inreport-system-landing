"use client";
import MinimalisticAwardItem from "./default-awards-item";

function MinimalisticAwards({ awards, section, activeSection }) {
  const visibleAwards = awards
    .filter((award) => !award.hide)
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));

  return (
    <div id="awards">
      {!!awards.length && (
        <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10">
          <h4
            className={`minimalistic-template-item-title w-fit duration-500 ${
              activeSection === "awards"
                ? "bg-lime-100 text-lime-500 opacity-100"
                : "bg-opacity-0"
            }`}
          >
            {section}
          </h4>
        </div>
      )}

      <section className="space-y-2 mt-4">
        {visibleAwards.map((award) => (
          <MinimalisticAwardItem key={award.id} award={award} />
        ))}
      </section>
    </div>
  );
}

export default MinimalisticAwards;
