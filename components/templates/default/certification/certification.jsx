"use client";
import DefaultCertificationItem from "./default-certification-item";

function DefaultCertification({ certifications, section }) {
  const visibleCertifications = certifications.filter(
    (certification) => !certification.hide
  );

  return (
    <div>
      <div className="sticky top-0 z-50 py-2 bg-white bg-opacity-50 backdrop-blur w-full">
        <h4 className="default-template-item-title">{section}</h4>
      </div>

      <section>
        {visibleCertifications.map((certification) => (
          <DefaultCertificationItem
            key={certification.id}
            certification={certification}
          />
        ))}
      </section>
    </div>
  );
}

export default DefaultCertification;
