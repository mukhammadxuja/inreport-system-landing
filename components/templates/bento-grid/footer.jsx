import React from "react";
import { useEffect, useState } from "react";

function BentoGridFooter({ userData }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center justify-between p-4 md:p-6 bg-accent rounded-lg mt-4">
      <span> {formatTime(time)}</span>
      <p>
        <small className="mx-1">©</small>
        {userData?.displayName}
      </p>
      <div className="w-5 h-5 rounded-full bg-black cursor-pointer"></div>
    </div>
  );
}

export default BentoGridFooter;
