'use client';

import { useState, useEffect, Suspense } from 'react';
import { Skeleton } from '@nextui-org/skeleton';

import getLocalTime from '@/utils/getLocalTime';

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

  return (
    <Suspense key={isMounted ? 'local' : 'UTC'}>
      <div className="mb-8">
        <Skeleton isLoaded={isMounted} className="rounded-lg">
          <h2>
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
        </Skeleton>
      </div>
    </Suspense>
  );
}
