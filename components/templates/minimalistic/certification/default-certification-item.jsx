"use client";
import Image from "next/image";

function MinimalisticCertificationItem({ certification }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <div
            className={`minimalistic-template-item flex items-center ${
              certification?.notExpire && "text-green-600"
            }`}
          >
            <p className="mr-1">
              {certification.year ? certification.year : certification.issued}
            </p>
            <p>
              {certification?.notExpire
                ? " – Not Expire"
                : ` – ${certification?.expires}`}
            </p>
          </div>
          <div
            className={`minimalistic-template-item-border ${
              certification?.notExpire && "border-green-600"
            }`}
          />
          <div className="flex items-center gap-1">
            {certification?.images && certification.images.length > 0 && (
              <>
                {certification?.images?.slice(0, 1).map(({ url, id, name }) => (
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
                certification?.notExpire && "text-green-600"
              }`}
              href={`${certification.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{certification?.organization}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full">
        <small
          className={`minimalistic-template-item opacity-80 ${
            certification?.notExpire && "text-green-700/80"
          }`}
        >
          {certification?.name}
        </small>
        {certification?.description ? (
          <small
            className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0 ${
              certification?.notExpire && "text-green-700/80"
            }`}
          >
            {certification?.description}
          </small>
        ) : (
          <small
            className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0 ${
              certification?.notExpire && "text-green-700/80"
            }`}
          >
            {certification?.location}
          </small>
        )}
      </div>
    </div>
  );
}

export default MinimalisticCertificationItem;
