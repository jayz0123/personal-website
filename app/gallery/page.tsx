import PhotoCarousel from '@/components/PhotoCarousel';

export default function Gallery() {
  return (
    <>
      <div className="flex flex-col flex-1 w-full items-center">
        <h2>Photo Subjects</h2>
        <PhotoCarousel />
      </div>
      <div className="flex flex-col flex-1 w-full items-center">
        <h2>Photo Subjects</h2>
        <PhotoCarousel />
      </div>
      <div className="flex flex-col flex-1 w-full items-center">
        <h2>Photo Subjects</h2>
        <PhotoCarousel />
      </div>
    </>
  );
}
