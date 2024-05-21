"use client";
import DefaultProjectItem from "./default-project-item";

function DefaultProjects({ projects, section }) {
  const visibleProjects = projects.filter((project) => !project.hide);

  return (
    <div className="p-4 md:p-6 bg-accent rounded-lg w-full">
      {!!projects.length && (
        <div className="sticky top-0 z-50 py-2 bg-accent bg-opacity-50 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section>
        {visibleProjects.map((project) => (
          <DefaultProjectItem key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default DefaultProjects;
