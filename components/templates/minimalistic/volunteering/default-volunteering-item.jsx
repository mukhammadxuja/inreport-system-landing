"use client";
import Image from "next/image";

function MinimalisticVolunteeringItem({ volunteering }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <div
            className={`minimalistic-template-item flex items-center ${
              volunteering?.present && "text-green-600"
            }`}
          >
            <p className="mr-1">
              {volunteering.year ? volunteering.year : volunteering.from}
            </p>
            <p>
              {volunteering?.present ? " – Present" : ` – ${volunteering?.to}`}
            </p>
          </div>
          <div
            className={`minimalistic-template-item-border ${
              volunteering?.present && "border-green-600"
            }`}
          />
          <div className="flex items-center gap-1">
            {volunteering?.images && volunteering.images.length > 0 && (
              <>
                {volunteering?.images?.slice(0, 1).map(({ url, id, name }) => (
                  <Image
                    key={id}
                    width={10}
                    height={10}
                    className="w-5 h-5 object-cover rounded-full"
                    src={url}
                    alt={name}
                  />
                ))}
              </>
            )}
            <a
              className={`minimalistic-template-item hover:underline ${
                volunteering?.present && "text-green-600"
              }`}
              href={`${volunteering.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{volunteering?.organization}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full">
        <small
          className={`minimalistic-template-item opacity-80 ${
            volunteering?.present && "text-green-700/80"
          }`}
        >
          {volunteering?.title}
        </small>
        {volunteering?.description ? (
          <small
            className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0 ${
              volunteering?.present && "text-green-700/80"
            }`}
          >
            {volunteering?.description}
          </small>
        ) : (
          <small
            className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0 ${
              volunteering?.present && "text-green-700/80"
            }`}
          >
            {volunteering?.location}
          </small>
        )}
      </div>
    </div>
  );
}

export default MinimalisticVolunteeringItem;
