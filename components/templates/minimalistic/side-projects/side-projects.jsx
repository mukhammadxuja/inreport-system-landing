"use client";
import MinimalisticSideProjectItem from "./default-project-item";

function MinimalisticSideSideProjects({
  sideProjects,
  section,
  activeSection,
}) {
  const visibleSideProjects = sideProjects.filter((project) => !project.hide);

  return (
    <div id="sideProjects">
      {!!sideProjects.length && (
        <div
          className={`sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10`}
        >
          <h4
            className={`minimalistic-template-item-title w-fit duration-500 ${
              activeSection === "sideProjects"
                ? "bg-lime-100 text-lime-500 opacity-100"
                : "bg-opacity-0"
            }`}
          >
            {section}
          </h4>
        </div>
      )}

      <section className="space-y-2 mt-4">
        {visibleSideProjects.map((project) => (
          <MinimalisticSideProjectItem key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default MinimalisticSideSideProjects;
