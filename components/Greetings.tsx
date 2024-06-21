'use client';

import getLocalTime from '@/utils/getLocalTime';

export default function Greetings() {
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

  return (
    <h2 className="text-3xl mb-10">
      <span className="font-bold">
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
      <span>
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
