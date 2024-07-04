import React from 'react';

export default function GalleryLayout({
  UK,
  Japan,
  China,
}: {
  UK: React.ReactNode;
  Japan: React.ReactNode;
  China: React.ReactNode;
}) {
  const countries = [
    { name: 'UK', page: UK },
    { name: 'Japan', page: Japan },
    { name: 'China', page: China },
  ];
  return (
    <section className="flex flex-col gap-y-16 items-center min-w-full">
      {countries.map((country, index) => (
        <div key={index} className="flex flex-col items-center min-w-full">
          <h1 className="font-bold text-2xl uppercase">{country.name}</h1>
          <div className="divider divider-vertical mt-0" />
          <div className="min-w-full gap-2 grid grid-cols-12">
            {country.page}
          </div>
        </div>
      ))}
    </section>
  );
}
