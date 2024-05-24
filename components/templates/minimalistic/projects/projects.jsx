"use client";
import MinimalisticProjectItem from "./default-project-item";

function MinimalisticProjects({ projects, section, activeSection }) {
  const visibleProjects = projects.filter((project) => !project.hide);

  return (
    <div id="projects">
      {!!projects.length && (
        <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10">
          <h4
            className={`minimalistic-template-item-title w-fit duration-500 ${
              activeSection === "projects"
                ? "bg-lime-100 text-lime-500 opacity-100"
                : "bg-opacity-0"
            }`}
          >
            {section}
          </h4>
        </div>
      )}

      <section className="space-y-2 mt-4">
        {visibleProjects.map((project) => (
          <MinimalisticProjectItem key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default MinimalisticProjects;