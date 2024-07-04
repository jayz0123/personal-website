import PhotoCard from '@/components/PhotoCard';

export default function UK() {
  const areas = [
    'London',
    'Liverpool',
    'Lake_District',
    'Isle_of_Skye',
    'Coastal_Path',
  ];

  return areas.map((area, index) => (
    <PhotoCard
      key={area}
      loading="eager"
      area={area}
      src={`/previews/UK/${area}.jpg`}
    />
  ));
}
