"use client";
import DefaultProjectItem from "./default-project-item";

function DefaultSideProjects({ sideProjects, section }) {
  const visibleSideProjects = sideProjects
    .filter((project) => !project.hide)
    .sort((a, b) => {
      if (a.ongoing && !b.ongoing) return -1;
      if (!a.ongoing && b.ongoing) return 1;
      return parseInt(b.year) - parseInt(a.year);
    });

  return (
    <div className="p-4 md:p-6 bg-accent rounded-lg w-full">
      {!!sideProjects.length && (
        <div className="sticky top-0 z-50 py-2 bg-accent bg-opacity-50 backdrop-blur w-full">
          <h4 className="default-template-item-title">{section}</h4>
        </div>
      )}

      <section>
        {visibleSideProjects.map((project) => (
          <DefaultProjectItem key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default DefaultSideProjects;
