"use client";

import getLocalTime from "@/utils/getLocalTime";

export default function Greetings() {
  const date = new Date();
  const currentTime = getLocalTime({ date });
  // const isMorning = currentTime.includes("AM");
  const isAfternoon = currentTime.includes("PM");
  const isEvening =
    currentTime.includes("PM") && Number(currentTime.split(":")[0]) >= 6;
  const isMidnight =
    currentTime.includes("AM") &&
    Number(currentTime.split(":")[0]) >= 0 &&
    Number(currentTime.split(":")[0]) <= 4;

  return (
    <h2 className="text-3xl my-4">
      <span className="font-bold">
        {`${
          isMidnight
            ? "Hey there, night wanderer! "
            : isEvening
            ? "Good evening! "
            : isAfternoon
            ? "Afternoon greetings! "
            : "Morning! "
        }`}
      </span>
      <span>
        {`${
          isMidnight
            ? "Let's pretend staying up late is totally a good idea!"
            : isEvening
            ? "Let's relax and do nothing—like the pros we are."
            : isAfternoon
            ? "Keep calm and fake productivity for a few more hours!"
            : "The early bird gets the worm, but the second mouse gets the cheese!"
        }`}
      </span>
    </h2>
  );
}
