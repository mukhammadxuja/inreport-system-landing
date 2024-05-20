"use client";
import DefaultProjectItem from "./default-project-item";

function DefaultSideProjects({ sideProjects, section }) {
  const visibleSideProjects = sideProjects.filter((project) => !project.hide);

  return (
    <div className="">
      <div className="sticky top-0 z-50 py-2 bg-white bg-opacity-50 backdrop-blur w-full">
        <h4 className="default-template-item-title">{section}</h4>
      </div>

      <section>
        {visibleSideProjects.map((project) => (
          <DefaultProjectItem key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default DefaultSideProjects;
