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
  const params = useParams<{ countrySlug: string }>();
  const router = useRouter();
  console.log(params);

  // Prefetch routes for each country
  useEffect(() => {
    countries.forEach((country) => {
      router.prefetch(country.href);
    });
  }, [countries, router]);

  return (
    <Tabs
      items={countries}
      defaultSelectedKey={undefined}
      selectedKey={params.countrySlug}
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
