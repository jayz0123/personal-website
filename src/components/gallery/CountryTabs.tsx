'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { Tab, Tabs } from '@nextui-org/tabs';

export function CountryTabs({
  children,
  countries,
}: {
  children: React.ReactNode;
  countries: { id: string; label: string; href: string }[];
}) {
  const params = useParams<{ country: string }>();
  console.log(params);

  return (
    <Tabs
      items={countries}
      defaultSelectedKey={undefined}
      selectedKey={params.country}
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
