import { PhotoCardPreview, PhotoCardContainer } from '@/components/gallery';

export default function Gallery() {
  const places = [
    {
      country: 'UK',
      areas: [
        'London',
        'Liverpool',
        'Lake-District',
        'Isle-of-Skye',
        'Coastal-Path',
      ],
    },
    {
      country: 'Japan',
      areas: ['Kumano-Kodo', 'Kyoto', 'Nara', 'Osaka'],
    },
    {
      country: 'China',
      areas: ['Tibet'],
    },
  ];

  return places.map((place, index) => (
    <PhotoCardContainer key={index} breadcrumbs={[place.country]}>
      {place.areas.map((area, index) => (
        <PhotoCardPreview
          key={index}
          src={`/previews/${place.country}/${area}.jpg`}
          priority={index === 0 ? true : false}
          country={place.country}
          area={area}
        />
      ))}
    </PhotoCardContainer>
  ));
}
