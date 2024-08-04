'use client';

import { Suspense, useEffect, useState } from 'react';

import { Skeleton } from '@nextui-org/skeleton';

import getLocalTime from '@/utils/getLocalTime';

import { GlowingText } from '../ui/';

export function Greetings() {
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
          <h2 className="text-5xl sm:text-6xl font-extrabold mb-4">
            <GlowingText isActive>
              {isMidnight
                ? 'Hey, late owl '
                : isEvening
                  ? 'Good evening '
                  : isAfternoon
                    ? 'Hello, afternoon '
                    : 'Good morning '}
            </GlowingText>
            <p className="text-xl font-semibold font-serif">
              {`${
                isMidnight
                  ? "Let's pretend staying up late is totally a good idea!"
                  : isEvening
                    ? "Let's relax and do absolutely nothing!"
                    : isAfternoon
                      ? 'Keep calm and fake productivity for a few more hours!'
                      : 'Early bird gets worms, but second mouse gets cheese!'
              }`}
            </p>
          </h2>
        </Skeleton>
      </div>
    </Suspense>
  );
}
