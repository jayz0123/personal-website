'use client';

import React, { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { Tab, Tabs } from '@nextui-org/tabs';

export function CountryTabs({
  children,
  countries,
}: {
  children: React.ReactNode;
  countries: { id: string; label: string; href: string }[];
}) {
  const router = useRouter();
  const selectedCountry = useParams<{ countrySlug: string }>().countrySlug;

  useEffect(() => {
    for (const country of countries) router.prefetch(country.href);
  }, [countries, router]);

  return (
    <Tabs
      items={countries}
      selectedKey={selectedCountry}
      variant="underlined"
      size="lg"
      className="font-bold font-serif"
      classNames={{
        panel: 'w-full',
      }}
    >
      {(country) => (
        <Tab key={country.id} title={country.label} href={country.href}>
          {children}
        </Tab>
      )}
    </Tabs>
  );
}
