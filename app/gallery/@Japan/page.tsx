import PhotoCard from '@/components/PhotoCard';

export default function Japan() {
  const areas = ['Kumano_Kodo', 'Kyoto', 'Nara', 'Osaka'];

  return areas.map((area) => (
    <PhotoCard key={area} area={area} src={`/previews/Japan/${area}.jpg`} />
  ));
}
