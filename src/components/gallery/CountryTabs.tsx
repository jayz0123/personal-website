'use client';

import { use, useEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Tab, Tabs } from '@nextui-org/tabs';

export function CountryTabs({
  children,
  countrySlugs,
  currentCountrySlug,
}: {
  children: React.ReactNode;
  countrySlugs: string[];
  currentCountrySlug: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const countryItems = countrySlugs.map((slug) => ({
    slug,
    label: slug.replace(/-/g, ' '),
    href: slug,
  }));

  useEffect(() => {
    for (const countrySlug of countrySlugs) router.prefetch(countrySlug);
  }, [countrySlugs, pathname, router]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Tabs
        items={countryItems}
        selectedKey={currentCountrySlug}
        variant="underlined"
        size="lg"
        className="font-bold font-serif"
        classNames={{
          panel: 'w-full',
        }}
      >
        {(countryItem) => (
          <Tab
            key={countryItem.slug}
            title={countryItem.label}
            href={countryItem.href}
          >
            {children}
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
