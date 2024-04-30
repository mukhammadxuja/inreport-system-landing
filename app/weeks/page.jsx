"use client";
import React, { useState } from "react";

function WeeksPage() {
  const [birthday, setBirthday] = useState("");
  const [weeksLived, setWeeksLived] = useState(0);

  const calculateWeeksLived = () => {
    const [day, month, year] = birthday.split(".").map(Number);
    const birthDate = new Date(year, month - 1, day); // month - 1 because months are 0-indexed in JavaScript
    const today = new Date();
    const millisecondsInWeek = 1000 * 60 * 60 * 24 * 7;
    const weeks = Math.floor((today - birthDate) / millisecondsInWeek);
    setWeeksLived(weeks);
  };

  const renderWeeks = () => {
    const weeks = [];
    for (let i = 0; i < 5200; i++) {
      if (i < weeksLived) {
        weeks.push(
          <div
            key={i}
            className="w-2 h-2 bg-green-500 mx-0.5 inline-block"
          ></div>
        );
      } else {
        weeks.push(
          <div
            key={i}
            className="w-2 h-2 bg-gray-500 mx-0.5 inline-block"
          ></div>
        );
      }
    }
    return weeks;
  };

  return (
    <div className="p-4">
      <input
        type="text"
        className="border border-gray-300 rounded-md p-2 mr-2"
        placeholder="Enter your birthday (DD.MM.YYYY)"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={calculateWeeksLived}
      >
        Calculate
      </button>
      <div className="mt-4">
        {weeksLived > 0 && <p>You have lived {weeksLived} weeks!</p>}
        <div className="mt-4">{renderWeeks()}</div>
      </div>
    </div>
  );
}

export default WeeksPage;
