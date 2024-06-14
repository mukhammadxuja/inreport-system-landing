"use client";
import MinimalisticCertificationItem from "./default-certification-item";

function MinimalisticCertification({ certifications, section, activeSection }) {
  const visibleCertifications = certifications
    .filter((certification) => !certification.hide)
    .sort((a, b) => parseInt(b.issued) - parseInt(a.issued));

    console.log('visibleCertifications', visibleCertifications);

  return (
    <div id="certifications">
      {!!certifications.length && (
        <div className="sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur w-full mt-8 md:mt-10">
          <h4
            className={`minimalistic-template-item-title w-fit duration-500 ${
              activeSection === "certifications"
                ? "bg-lime-100 text-lime-500 opacity-100"
                : "bg-opacity-0"
            }`}
          >
            {section}
          </h4>
        </div>
      )}

      <section className="space-y-2 mt-4">
        {visibleCertifications.map((certification) => (
          <MinimalisticCertificationItem
            key={certification.id}
            certification={certification}
          />
        ))}
      </section>
    </div>
  );
}

export default MinimalisticCertification;
