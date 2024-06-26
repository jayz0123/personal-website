'use client';

import getLocalTime from '@/utils/getLocalTime';
import { useState, useEffect } from 'react';

export default function Greetings() {
  const [isMounted, setIsMounted] = useState(false);

  const date = new Date();
  const currentTime = getLocalTime(date);
  const isAfternoon =
    Number(currentTime.split(':')[0]) >= 12 &&
    Number(currentTime.split(':')[0]) < 19;
  const isEvening =
    Number(currentTime.split(':')[0]) >= 19 &&
    Number(currentTime.split(':')[0]) < 24;
  const isMidnight =
    Number(currentTime.split(':')[0]) >= 0 &&
    Number(currentTime.split(':')[0]) < 5;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="flex flex-col mb-8 gap-2">
        <div className="skeleton h-9 w-full"></div>
        <div className="skeleton h-6 w-1/3 md:hidden"></div>
      </div>
    );

  return (
    <h2 className="mb-8">
      <span className="text-3xl font-bold">
        {`${
          isMidnight
            ? 'Hey there, night wanderer! '
            : isEvening
              ? 'Good evening! '
              : isAfternoon
                ? 'Afternoon greetings! '
                : 'Morning! '
        }`}
      </span>
      <span className="text-2xl">
        {`${
          isMidnight
            ? "Let's pretend staying up late is totally a good idea!"
            : isEvening
              ? "Let's relax and do nothing—like the pros we are."
              : isAfternoon
                ? 'Keep calm and fake productivity for a few more hours!'
                : 'The early bird gets the worm, but the second mouse gets the cheese!'
        }`}
      </span>
    </h2>
  );
}
