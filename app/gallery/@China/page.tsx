import PhotoCard from '@/components/PhotoCard';

export default function China() {
  const areas = ['Tibet'];

  return areas.map((area) => (
    <PhotoCard key={area} area={area} src={`/previews/China/${area}.jpg`} />
  ));
}
