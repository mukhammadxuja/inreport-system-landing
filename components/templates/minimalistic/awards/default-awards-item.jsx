"use client";
import Image from "next/image";

function MinimalisticAwardItem({ award }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <p className="minimalistic-template-item ">{award.year}</p>
          <div className="minimalistic-template-item-border" />
          <div className="flex items-center gap-1">
            {award?.images && award.images.length > 0 && (
              <>
                {award?.images?.slice(0, 1).map(({ url, id, name }) => (
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
              className={`minimalistic-template-item hover:underline`}
              href={`${award.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Presented by {award?.presentedBy}</span>
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full">
        <small className={`minimalistic-template-item opacity-80`}>
          {award?.title}
        </small>
        <small
          className={`minimalistic-template-item w-full max-w-96 whitespace-pre-line md:text-right opacity-80 mt-1 md:mt-0`}
        >
          {award?.description}
        </small>
      </div>
    </div>
  );
}

export default MinimalisticAwardItem;
