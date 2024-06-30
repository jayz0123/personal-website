import PhotoCard from '@/components/PhotoCard';

export default function Gallery() {
  const places = [
    {
      country: 'UK',
      areas: [
        'London',
        'Liverpool',
        'Lake_District',
        'Isle_of_Skye',
        'Coastal_Path',
      ],
    },
    {
      country: 'Japan',
      areas: ['Kumano_Kodo', 'Kyoto', 'Nara', 'Osaka'],
    },
    {
      country: 'China',
      areas: ['Tibet'],
    },
  ];

  return (
    <div className="flex flex-col gap-y-16 items-center">
      {places.map((place) => (
        <div key={place.country} className="flex flex-col items-center">
          <h1 className="font-bold text-2xl">{place.country}</h1>
          <div className="divider divider-vertical mt-0" />
          <div className="min-w-full gap-2 grid grid-cols-12">
            {place.areas.map((area) => (
              <PhotoCard
                key={area}
                src={`/${place.country}/${area}/thumbnail.jpg`}
                area={area}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
